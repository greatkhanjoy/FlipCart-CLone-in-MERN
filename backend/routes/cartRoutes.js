import express from 'express'
import { addToCart, getCarts } from '../controllers/cartController.js'
import { protect } from '../middlewares/authMiddleware.js'
const Router = express.Router()

Router.route('/').get(protect, getCarts).post(protect, addToCart)

export default Router
