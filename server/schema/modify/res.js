import {Menu} from '../../models'
const resolvers = {
  RootQuery: {
    async fetchModifiers(_, {input}) {
      var menu = new Menu(input)
      return await menu.getModifiers()
    },
  },
  RootMutation: {},
}
export default resolvers
