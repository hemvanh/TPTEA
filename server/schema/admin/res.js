import {Admin} from '../../models'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const resolvers = {
  RootQuery: {},
  RootMutation: {
    async loginAdmin(_, {input}) {
      const admin = await Admin.findOne({where: {username: input.username}})
      if (!admin) {
        throw new Error('Admin Account not found. Please try again!')
      }
      const valid = await bcrypt.compare(input.password, admin.password)
      if (!valid) {
        throw new Error('Wrong Admin Password ...')
      }
      return (
        jwt.sign(
          {
            id: admin.id,
            username: admin.username,
            roles: admin.roles,
          },
          process.env.JWT_SECRET,
          {expiresIn: '1y'}
        ) + 'a'
      )
    },
  },
}
export default resolvers
