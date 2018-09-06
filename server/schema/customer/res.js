import {Customer} from '../../models'
import GraphQLDate from 'graphql-date'
import bcrypt from 'bcrypt'
const SALT = 10
import jwt from 'jsonwebtoken'
import {_auth} from '../../util'

const resolvers = {
  Date: GraphQLDate,
  RootQuery: {
    async getCustomer(_, {input}, {authCustomer}) {
      _auth(authCustomer)
      return await Customer.findOne({where: {id: input}})
    },
  },
  RootMutation: {
    async login(_, {input}) {
      const user = await Customer.findOne({where: {username: input.username}})
      if (!user) {
        throw new Error('Account not found!')
      }
      const valid = await bcrypt.compare(input.password, user.password)
      if (!valid) {
        throw new Error('Wrong Password ...')
      }
      return jwt.sign(
        {
          id: user.id,
          username: user.username,
          name: user.name,
          add: user.add,
          phone: user.phone,
          balance: user.balance,
          points: user.points,
        },
        process.env.JWT_SECRET,
        {expiresIn: '1y'}
      )
    },
    async reg(_, {input}) {
      var user = await Customer.findOne({where: {username: input.username}})
      if (user) {
        throw new Error('Account is existed!')
      }
      input.password = bcrypt.hashSync(input.password, SALT)
      return await Customer.upsert(input).then(async function() {
        user = await Customer.findOne({where: {username: input.username}})
        return jwt.sign(
          {
            id: user.id,
            username: user.username,
            name: user.name,
            add: user.add,
            phone: user.phone,
            balance: user.balance,
            points: user.points,
          },
          process.env.JWT_SECRET,
          {expiresIn: '1y'}
        )
      })
    },
  },
}

export default resolvers
