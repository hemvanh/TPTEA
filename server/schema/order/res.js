import {Order, OrderDetail, Menu, Modifier, sequelize, Store} from '../../models'
import {_auth} from '../../util'
const fetch = require('node-fetch')
const apiKey = 'AIzaSyCEUChDraEFCd3f79AK2xSh1FFDDJUpnWw'

async function formatOrderInput(input) {
  let formatedInput = {...input, ...input.placeOrderMethod}
  delete formatedInput.placeOrderMethod
  formatedInput.deliveryStoreId = await findNearestStore(formatedInput.deliveryAddress)
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
async function findNearestStore(deliveryAddress) {
  let stores = await Store.findAll()
  let storeAddresses = getStoreAddresses(stores)
  let url =
    'https://maps.googleapis.com/maps/api/distancematrix/json?origins=' + deliveryAddress + '&destinations=' + storeAddresses + '&key=' + apiKey
  let distances = await fetch(url)
    .then(res => res.json())
    .then(json => {
      return json
    })
  let storeName = findNearestStoreName(distances)
  return stores.find(store => store.get('addressGmap') === storeName).get('id')
}
function findNearestStoreName(distances) {
  let elements = distances.rows[0].elements,
    minElement = distances.rows[0].elements[0].distance.value,
    minIndex = 0
  for (let i = 1; i < elements.length; i++) {
    if (minElement > elements[i].distance.value) {
      minElement = elements[i]
      minIndex = i
    }
  }
  return distances.destination_addresses[minIndex]
}
function getStoreAddresses(stores) {
  let strAddress = ''
  stores.forEach(store => {
    strAddress += store.get('addressGmap') + '|'
  })
  return strAddress.substring(0, strAddress.length - 1)
}

const resolvers = {
  RootQuery: {},
  RootMutation: {
    async placeOrder(_, {input}, {loggedInUser}) {
      _auth(loggedInUser)
      try {
        return sequelize
          .transaction(async t => {
            return await Order.create(await formatOrderInput(input), {transaction: t}).then(async createdOrder => {
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
