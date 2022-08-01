import asyncHandler from 'express-async-handler'
import Cart from '../models/cart.js'

//Cart helper functions
const cartHelper = async (userid) => {
  const cart = await Cart.findOne({ user: userid })
  if (cart) {
    return {
      count: cart.cartItems.length,
      totalPrice: cart.cartItems.reduce((acc, curr) => {
        return acc + curr.price * curr.quantity
      }, 0),
      totalItems: cart.cartItems.reduce((acc, curr) => {
        return acc + curr.quantity
      }, 0),
    }
  } else {
    return {
      count: 0,
      totalPrice: 0,
      totalItems: 0,
    }
  }
}

//@desc Get cart
//@route GET /api/carts
//@access Private
const getCarts = asyncHandler(async (req, res) => {
  const carts = await Cart.find({ user: req.user.id })
  const cartdetails = await cartHelper(req.user.id)
  res.status(200).json({
    success: true,
    count: cartdetails.count,
    totalPrice: cartdetails.totalPrice,
    totalItems: cartdetails.totalItems,
    cartItems: carts,
  })
})

//@desc Add to cart
//@route POST /api/carts
//@access Private
const addToCart = asyncHandler(async (req, res) => {
  const cartdetails = await cartHelper(req.user.id)

  //Check if cart exists
  const cartExist = await Cart.findOne({ user: req.user._id })
  if (cartExist) {
    //if cart already exists, update cart

    //Find the product in the cart
    const productExist = cartExist.cartItems.find(
      (item) =>
        item.product.toString() === req.body.cartItems.product.toString()
    )
    if (productExist) {
      //if product already exists, update quantity

      //if product quantity is 0, delete product
      if (req.body.cartItems.quantity === 0) {
        await Cart.findOneAndUpdate(
          { _id: cartExist._id },
          { $pull: { cartItems: { product: req.body.cartItems.product } } }
        )
      } else {
        productExist.quantity = req.body.cartItems.quantity
        productExist.price = req.body.cartItems.price || productExist.price
        await cartExist.save()
      }
    } else {
      //if product does not exist, add to cart

      //if product quantity is 0 do nothing
      if (req.body.cartItems.quantity > 0) {
        cartExist.cartItems.push(req.body.cartItems)
        await cartExist.save()
      }
    }
    const cartData = await Cart.findOne({ user: req.user._id })
    res.status(200).json({
      success: true,
      count: cartdetails.count,
      totalPrice: cartdetails.totalPrice,
      totalItems: cartdetails.totalItems,
      cartItems: cartData,
    })
  } else {
    //if cart does not exist, create cart
    req.body.user = req.user._id
    const cart = await Cart.create(req.body)
    res.status(200).json({
      success: true,
      count: cartdetails.count,
      totalPrice: cartdetails.totalPrice,
      totalItems: cartdetails.totalItems,
      cartItems: cart,
    })
  }
})

export { getCarts, addToCart }
