import express from 'express'
import { adminOnly, protect } from '../middlewares/authMiddleware.js'
import { upload } from '../middlewares/fileUpload.js'
// import { validate, ValidateProduct } from '../validators/authValidator.js'

const Router = express.Router()

import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from '../controllers/productController.js'

Router.route('/')
  .get(getProducts)
  .post(protect, adminOnly, upload.array('images'), createProduct)
Router.route('/:id')
  .get(getProduct)
  .put(protect, adminOnly, upload.array('images'), updateProduct)
  .delete(protect, adminOnly, deleteProduct)

export default Router
