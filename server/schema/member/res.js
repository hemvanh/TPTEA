import {Customer, Order, OrderDetail, Menu} from '../../models'
import {_auth} from '../../util'
const resolvers = {
  RootQuery: {
    async listMember(_, __, {authCustomer}) {
      _auth(authCustomer)
      return await Customer.findAll({where: {id: authCustomer.id}})
    },
    async listOrderHistory(_, __, {authCustomer}) {
      _auth(authCustomer)
      return await Order.findAll({
        where: {
          customerId: authCustomer.id,
        },
        include: [
          {
            model: OrderDetail,
            include: [
              {
                model: Menu,
              },
            ],
          },
        ],
      })
    },
  },
  RootMutation: {},
  OrderDetail: {
    async menuname(orderDetail) {
      return orderDetail.getMenu().get('name')
    },
  },
}

export default resolvers
