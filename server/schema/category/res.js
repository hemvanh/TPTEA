import {Category} from '../../models'
const resolvers = {
  RootQuery: {
    async listCategories() {
      return await Category.findAll()
    },
  },
  RootMutation: {},
}
export default resolvers
