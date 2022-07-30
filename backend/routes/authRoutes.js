import express from 'express'
import {
  login,
  loginWithUsername,
  profile,
  register,
} from '../controllers/authController.js'
import { protect } from '../middlewares/authMiddleware.js'
const Router = express.Router()

Router.route('/login').post(login)
Router.route('/login2').post(loginWithUsername)
Router.route('/register').post(register)
Router.route('/me').get(protect, profile)

export default Router
