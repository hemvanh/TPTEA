import {Customer} from '../../models'
import GraphQLDate from 'graphql-date'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {_auth, _authAdmin, authGiftCard} from '../../util'
const SALT = 10
async function generateLoginJwt({username}, msg = '') {
  var user = await Customer.findOne({where: {username}})
  var token =
    jwt.sign(
      {
        id: user.id,
        username: user.username,
        name: user.name,
        address: user.address,
        phone: user.phone,
        balance: user.balance,
        points: user.points,
      },
      process.env.JWT_SECRET,
      {expiresIn: '1y'}
    ) + 'c'
  return msg === '' ? token : {token, msg}
}

const resolvers = {
  Date: GraphQLDate,
  RootQuery: {
    async getCustomer(_, __, {loggedInUser}) {
      _auth(loggedInUser)
      return await Customer.findById(loggedInUser.id)
    },
    async fetchCustomers(_, __, {loggedInUser}) {
      _authAdmin(loggedInUser)
      return await Customer.findAll()
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
    async deleteCustomers(_, {input}, {loggedInUser}) {
      _authAdmin(loggedInUser)
      return await Customer.destroy({
        where: {
          id: {
            $in: input,
          },
        },
      })
    },
    async updateCustomer(_, {input}, {loggedInUser}) {
      _authAdmin(loggedInUser)
      if (input.password !== '') {
        input.password = bcrypt.hashSync(input.password, SALT)
      } else {
        delete input.password
      }
      return await Customer.update(input, {
        where: {
          id: input.id,
        },
      }).then(() => {
        return input
      })
    },
    async createCustomer(_, {input}, {loggedInUser}) {
      _authAdmin(loggedInUser)
      var user = await Customer.findOne({where: {username: input.username}})
      if (user) {
        throw new Error('Account is existed!')
      }
      input.type = 'password'
      input.password = bcrypt.hashSync(input.password, SALT)
      return await Customer.create(input).then(async function(customer) {
        return customer
      })
    },
    async applyGiftCard(_, {input}, {loggedInUser}) {
      _auth(loggedInUser)
      let giftCard = authGiftCard(input.jwt)
      if (giftCard.expired) {
        throw new Error('This gift card has expired!')
      }
      let user = await Customer.findById(input.customerId)
      let balance = user.get('balance') + giftCard.giftCard.amount
      return await user.update({balance}).then(() => balance)
    },
  },
}

export default resolvers
