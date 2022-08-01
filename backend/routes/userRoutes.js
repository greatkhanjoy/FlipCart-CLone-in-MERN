import express from 'express'
import { createUser, getUsers } from '../controllers/userController.js'
import { adminOnly, protect } from '../middlewares/authMiddleware.js'
import { validate, ValidateNewUser } from '../validators/authValidator.js'
const Router = express.Router()

Router.route('/')
  .get(protect, adminOnly, getUsers)
  .post(protect, adminOnly, ValidateNewUser, validate, createUser)

export default Router
