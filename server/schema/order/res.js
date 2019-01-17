import {Order, OrderDetail, Menu, Modifier, sequelize, Store} from '../../models'
import {_auth} from '../../util'
const fetch = require('node-fetch')
const apiKey = 'AIzaSyCEUChDraEFCd3f79AK2xSh1FFDDJUpnWw'

function formatOrderInput(input) {
  const formatedInput = {...input, ...input.placeOrderMethod}
  delete formatedInput.placeOrderMethod
  return formatedInput
}
async function createOrderDetail(orderDetails, orderId) {
  try {
    let menuIds = orderDetails.map(orderDetail => orderDetail.menuId)
    let menus = await Menu.findAll({where: {id: menuIds}})
    let arrModifierIds = orderDetails.map(orderDetail => orderDetail.modifierIds)
    let modifierIds = [...new Set([].concat.apply([], arrModifierIds))]
    let modifiers = await Modifier.findAll({where: {id: modifierIds}})

    orderDetails.map(orderDetail => {
      orderDetail.orderId = orderId
      let menuPrice = menus.find(menu => menu.get('id') === orderDetail.menuId).get('price')
      let modifiersPrice = getModifiersPrice(modifiers, orderDetail.modifierIds)
      orderDetail.price = (parseFloat(menuPrice) + modifiersPrice) * orderDetail.quantity
      orderDetail.modifierIds = orderDetail.modifierIds.toString()
    })

    return orderDetails
  } catch (error) {
    throw new Error(error.message)
  }
}
function getModifiersPrice(modifiers, modifierIds) {
  try {
    let modifiersPrice = 0
    modifierIds.forEach(modifierId => {
      let modifierPrice = modifiers.find(modifier => modifier.get('id') === modifierId).get('price')
      modifiersPrice += parseFloat(modifierPrice)
    })
    return modifiersPrice
  } catch (error) {
    throw new Error(error.message)
  }
}
async function getLocation(address) {
  let url = 'https://maps.google.com/maps/api/geocode/json?address=' + address + '&key=' + apiKey
  var location = await fetch(url)
    .then(res => res.json())
    .then(json => {
      //console.log(json.results)
      return json.results[0].geometry.location
    })
  console.log('location:%s', location)
}
async function getDistances(devliveryAddress, storesAddress) {
  let url = 'https://maps.googleapis.com/maps/api/distancematrix/json?origins=' + devliveryAddress + '&destinations=' + storesAddress + '&key=' + apiKey
  await fetch(url)
    .then(res => res.json())
    .then(json => {
      //console.log(json.results)
      return json
    })
  console.log('location:%s', location)
}
async function fetchLocationStores(){
  let stores = await Store.findAll()
  return stores
  /*
    return {
      _1:{
        lat: 134,
        lng: 123
      },
      _2
    }
  */
}

const resolvers = {
  RootQuery: {},
  RootMutation: {
    async placeOrder(_, {input}, {loggedInUser}) {
      _auth(loggedInUser)
      try {
        getLocation(input.placeOrderMethod.deliveryAddress)
        return sequelize
          .transaction(async t => {
            return await Order.create(formatOrderInput(input), {transaction: t}).then(async createdOrder => {
              await OrderDetail.bulkCreate(await createOrderDetail(input.orderDetails, createdOrder.get('id')), {transaction: t})
              return createdOrder
            })
          })
          .then(createdOrder => {
            return createdOrder.get('id')
          })
          .catch(err => {
            throw new Error(err)
          })
      } catch (error) {
        throw new Error(error.message)
      }
    },
  },
}
export default resolvers
