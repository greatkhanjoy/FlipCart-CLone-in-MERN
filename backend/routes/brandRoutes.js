import express from 'express'
import {
  createBrand,
  deleteBrand,
  getBrand,
  getBrands,
  updateBrand,
} from '../controllers/brandController.js'
import { adminOnly, protect } from '../middlewares/authMiddleware.js'
import { upload } from '../middlewares/fileUpload.js'
const Router = express.Router()

Router.route('/')
  .get(getBrands)
  .post(protect, adminOnly, upload.single('image'), createBrand)
Router.route('/:id')
  .get(getBrand)
  .put(protect, adminOnly, upload.single('image'), updateBrand)
  .delete(protect, adminOnly, deleteBrand)

export default Router
