import express from 'express'
import { createUser, getUsers } from '../controllers/userController.js'
import { adminOnly, protect } from '../middlewares/authMiddleware.js'
import validateUser from '../validators/userValidator.js'
const Router = express.Router()

Router.route('/')
  .get(protect, adminOnly, getUsers)
  .post(protect, adminOnly, validateUser, createUser)

export default Router
