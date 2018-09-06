import {Order, OrderDetail, Menu} from '../../models'
import {_auth} from '../../util'
const resolvers = {
  RootQuery: {
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
