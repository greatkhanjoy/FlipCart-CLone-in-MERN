import express from 'express'
import {
  addToCart,
  deleteCart,
  getCart,
  getCarts,
  updateCart,
} from '../controllers/cartController.js'
import { protect } from '../middlewares/authMiddleware.js'
const Router = express.Router()

Router.route('/').get(protect, getCarts).post(protect, addToCart)
Router.route('/:id')
  .get(protect, getCart)
  .put(protect, updateCart)
  .delete(protect, deleteCart)

export default Router
