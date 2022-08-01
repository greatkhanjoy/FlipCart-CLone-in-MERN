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
  loginValidator,
  loginValidatorTwo,
  validate,
} from '../validators/authValidator.js'

Router.route('/login').post(loginValidator, validate, login)
Router.route('/login2').post(loginValidatorTwo, validate, loginWithUsername)
Router.route('/register').post(register)
Router.route('/me').get(protect, profile)

export default Router
