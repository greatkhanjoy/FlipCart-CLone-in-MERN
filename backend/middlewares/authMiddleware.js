import asyncHandler from 'express-async-handler'
import User from '../models/user.js'
import { verifyToken } from '../util/jwt.js'

const protect = asyncHandler(async (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization']

  if (!token) {
    res.status(401)
    throw new Error('Not authorized')
  }
  token = token.split(' ')[1]
  if (!token && !token.startsWith('Bearer ')) {
    res.status(401)
    throw new Error('Not authorized')
  }

  const decoded = verifyToken(token)
  if (!decoded) {
    res.status(401)
    throw new Error('Not authorized')
  }

  req.user = await User.findById(decoded.id).select('-password')
  next()
})

const adminOnly = asyncHandler(async (req, res, next) => {
  if (req.user.role !== 'admin') {
    res.status(403)
    throw new Error('Not authorized')
  }
  next()
})

export { protect, adminOnly }
