const Order = `
  type PlaceOrderMethod {
    deliveryStoreId: Int
    deliveryAddress: String
    deliveryContact: String
    pickUpStoreId: Int
    pickUpTime: Date
    isStorePickUp: Boolean
  }
  input PlaceOrderMethodInput {
      deliveryStoreId: Int
      deliveryAddress: String
      deliveryContact: String
      deliveryTime: Date
      pickUpStoreId: Int
      pickUpTime: Date
      isStorePickUp: Boolean
  }
  type Order {
    id: Int
    customerId: Int
    placeOrderMethod: PlaceOrderMethod 
    createdAt: Date
    orderDetails: [OrderDetail]
  }
  input OrderInput {
    customerId: Int!
    placeOrderMethod: PlaceOrderMethodInput
    pickUpTime: Date
    orderDetails: [OrderDetailInput]
  }
`
export default Order
