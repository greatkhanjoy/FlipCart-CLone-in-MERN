import express from 'express'
const Router = express.Router()

import {
  login,
  loginWithUsername,
  profile,
  register,
} from '../controllers/authController.js'
import { protect } from '../middlewares/authMiddleware.js'
import {
  validateLogin,
  validateLoginTwo,
  validateRegistration,
} from '../validators/authValidator.js'

Router.route('/login').post(validateLogin, login)
Router.route('/login2').post(validateLoginTwo, loginWithUsername)
Router.route('/register').post(validateRegistration, register)
Router.route('/me').get(protect, profile)

export default Router
