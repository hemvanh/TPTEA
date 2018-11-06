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
    async genCustomerPaymentId(_, {input}, {loggedInUser}) {
      _auth(loggedInUser)
      let user = await Customer.findById(input)
      if (user) return jwt.sign({id: input}, process.env.JWT_SECRET, {expiresIn: '30s'})
      else throw new Error('Customer not found!')
    },
    async verifyCustomerPaymentId(_, {input}, {loggedInUser}) {
      _auth(loggedInUser)
      return jwt.verify(input, process.env.JWT_SECRET, async (err, jwtDecode) => {
        if (err) throw new Error(err.message)
        else return (await Customer.findById(jwtDecode.id)) || new Error('Customer not found!')
      })
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
      return await Customer.upsert(input).then(async () => {
        return await generateLoginJwt(input)
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
      return await Customer.upsert(input).then(async () => {
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
      return await Customer.create(input).then(customer => customer)
    },
    async applyGiftCard(_, {input}, {loggedInUser}) {
      _auth(loggedInUser)
      let {giftCard, expired} = await authGiftCard(input.jwt)
      if (expired) throw new Error('This gift card has expired!')
      if (giftCard.customerId) throw new Error('The gift card is not available anymore!')
      let user = await Customer.findById(input.customerId)
      if (user) {
        let balance = user.get('balance') + giftCard.amount
        return await user.update({balance}).then(async () => {
          return await giftCard.update({customerId: input.customerId}).then(() => balance)
        })
      } else throw new Error('Not found Customer info!')
    },
  },
}

export default resolvers
