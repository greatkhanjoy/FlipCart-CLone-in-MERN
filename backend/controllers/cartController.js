import asyncHandler from 'express-async-handler'
import Cart from '../models/cart.js'

//@desc Get all carts
//@route GET /api/carts
//@access Public
export const getCarts = asyncHandler(async (req, res, next) => {
  const carts = await Cart.find()
  res.status(200).json({
    success: true,
    count: carts.length,
    data: carts,
  })
})

export { getCarts }
