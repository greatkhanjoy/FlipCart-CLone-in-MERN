import express from 'express'
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategory,
  updateCategory,
} from '../controllers/categoryController.js'
import { adminOnly, protect } from '../middlewares/authMiddleware.js'
import { validate, ValidateCategory } from '../validators/authValidator.js'
const Router = express.Router()

Router.route('/')
  .get(getCategories)
  .post(protect, adminOnly, ValidateCategory, validate, createCategory)
Router.route('/:id')
  .get(getCategory)
  .put(protect, adminOnly, ValidateCategory, validate, updateCategory)
  .delete(protect, adminOnly, deleteCategory)

export default Router
