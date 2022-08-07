import express from 'express'
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategory,
  updateCategory,
} from '../controllers/categoryController.js'
import { adminOnly, protect } from '../middlewares/authMiddleware.js'
import { upload } from '../middlewares/fileUpload.js'
import validateCategory from '../validators/categoryValidator.js'
const Router = express.Router()

Router.route('/')
  .get(getCategories)
  .post(
    protect,
    adminOnly,
    upload.single('image'),
    validateCategory,
    createCategory
  )
Router.route('/:id')
  .get(getCategory)
  .put(protect, adminOnly, upload.single('image'), updateCategory)
  .delete(protect, adminOnly, deleteCategory)

export default Router
