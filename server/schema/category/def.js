const Category = `
  type Category {
    id: Int
    name: String
    desc: String
    img: String
    mainCategory: String
  }
  input CategoryInput {
    id: Int
    name: String
    desc: String
    img: String
  }
`
export default Category
