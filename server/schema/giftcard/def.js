const GiftCard = `
  type GiftCard {
    id: Int
    code: String
    userName: String
    amount: Int
    expiry: Int
    createdAt: Date
  }

  input GiftCardInput {
    id: Int
    amount: Int!
    expiry: Int!
  }

  input GenGiftCardInput {
    amount: Int!
    expiry: Int!
  }
`
export default GiftCard
