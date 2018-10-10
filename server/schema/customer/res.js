import {Customer} from '../../models'
import GraphQLDate from 'graphql-date'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {_auth} from '../../util'
const SALT = 10
async function generateLoginJwt({username}, msg = '') {
  var user = await Customer.findOne({where: {username}})
  var token = jwt.sign(
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
  return msg === '' ? token : {token, msg}
}

const resolvers = {
  Date: GraphQLDate,
  RootQuery: {
    async getCustomer(_, __, {authCustomer}) {
      _auth(authCustomer)
      return await Customer.findById(authCustomer.id)
    },
  },
  RootMutation: {
    async login(_, {input}) {
      const user = await Customer.findOne({where: {username: input.username}})
      if (!user) {
        throw new Error('Account not found. Please try again!')
      }
      const valid = await bcrypt.compare(input.password, user.password)
      if (!valid) {
        throw new Error('Wrong Password ...')
      }
      return generateLoginJwt(input)
    },
    async register(_, {input}) {
      var user = await Customer.findOne({where: {username: input.username, type: input.type}})
      if (user) {
        throw new Error('Account is existed!')
      }
      input.password = bcrypt.hashSync(input.password, SALT)
      return await Customer.upsert(input).then(async function() {
        return generateLoginJwt(input)
      })
    },
    async loginFb(_, {input}) {
      const user = await Customer.findOne({where: {username: input.username}})
      if (!user) {
        throw new Error('Account not found. Please Register by Facebook First!')
      }
      return generateLoginJwt(input)
    },
    async registerFb(_, {input}) {
      var user = await Customer.findOne({where: {username: input.username, type: input.type}})
      var msgRes = ''
      if (user) {
        msgRes = 'Account is existed!'
        input.id = user.id
      } else {
        msgRes = 'Regitered Successfully!'
      }
      return await Customer.upsert(input).then(async function() {
        return generateLoginJwt(input, msgRes)
      })
    },
  },
}

export default resolvers
