import uuidv4 from 'uuid/v4'
import jwt from 'jsonwebtoken'
export const _auth = loggedInUser => {
  if (!loggedInUser) {
    throw new Error('Please login first!')
  }
  if (loggedInUser.roles) {
    throw new Error('This is not a Valid Customer account!')
  }
}

export const _authAdmin = loggedInUser => {
  if (!loggedInUser) {
    throw new Error('Please login as an Admin first!')
  }
  if (loggedInUser.roles == undefined) {
    throw new Error('This Account is not an Admin!')
  }
}

export const genGiftCard = (amount, expiry) => {
  if (typeof amount !== 'number' || typeof expiry !== 'number') {
    throw new Error('Amount and Expiry must be number!')
  }
  return jwt.sign(
    {
      guid: uuidv4(),
      createdDate: 1540530472000,
      amount,
      expiry,
    },
    process.env.JWT_GIFT_SECRET
  )
}

export const authGiftCard = jwtGiftCard => {
  var giftCard = jwt.verify(jwtGiftCard, process.env.JWT_GIFT_SECRET)
  var elapsedTime = new Date().getTime() - giftCard.createdDate
  let expired = giftCard.expiry * 86400000 < elapsedTime
  return {
    jwt: giftCard,
    expired,
  }
}
