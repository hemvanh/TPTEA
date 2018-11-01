import jwt from 'jsonwebtoken'
import {GiftCard} from './models'
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

export const genGiftCard = giftCardId => {
  if (typeof giftCardId !== 'number') {
    throw new Error('Gift card id must be number!')
  }
  return jwt.sign(giftCardId, process.env.JWT_GIFT_SECRET)
}

export const authGiftCard = async jwtGiftCard => {
  let giftCardId = jwt.verify(jwtGiftCard, process.env.JWT_GIFT_SECRET)
  let giftCard = await GiftCard.findById(giftCardId)
  if (giftCard) {
    var elapsedTime = new Date().getTime() - new Date(giftCard.createdAt).getTime()
    let expired = giftCard.expiry * 86400000 < elapsedTime
    return {
      giftCard,
      expired,
    }
  } else throw new Error('This gift card not available!')
}
