import {Category} from '../../models'
const resolvers = {
  RootQuery: {
    async listMenus(_, {input}) {
      var cat = new Category(input)
      return await cat.getMenus()
    },
  },
  RootMutation: {},
}
export default resolvers
