import bcrypt from 'bcryptjs'
import asyncHandler from 'express-async-handler'
import User from '../models/user.js'
import { generateToken } from '../util/jwt.js'

//@desc  Login user with email and password
//@route POST /api/auth/login
//@access Public
const login = asyncHandler(async (req, res) => {
  const { email, password, username } = req.body

  if (!email || !password) {
    res.status(400)
    throw new Error('Please enter all fields')
  }

  const user = await User.findOne({ email })

  if (!user) {
    res.status(400)
    throw new Error('Invalid credentials')
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) {
    res.status(400)
    throw new Error('Invalid credentials')
  }

  const token = generateToken(user._id)
  res.status(200).json({
    _id: user._id,
    name: user.firstName + ' ' + user.lastName,
    email: user.email,
    username: user.username,
    role: user.role,
    mobile: user.mobile,
    profileImage: user.profileImage,
    token,
  })
})

//@desc  Login user with username and password
//@route POST /api/auth/login
//@access Public
const loginWithUsername = asyncHandler(async (req, res) => {
  const { password, username } = req.body

  if (!username || !password) {
    res.status(400)
    throw new Error('Please enter all fields')
  }

  const user = await User.findOne({ username })

  if (!user) {
    res.status(400)
    throw new Error('Invalid credentials')
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) {
    res.status(400)
    throw new Error('Invalid credentials')
  }

  const token = generateToken(user._id)
  res.status(200).json({
    _id: user._id,
    name: user.firstName + ' ' + user.lastName,
    email: user.email,
    username: user.username,
    role: user.role,
    mobile: user.mobile,
    profileImage: user.profileImage,
    token,
  })
})

//@desc  Register user
//@route POST /api/auth/register
//@access Public
const register = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, username, password } = req.body

  if (!firstName || !lastName || !email || !username || !password) {
    res.status(400)
    throw new Error('Please enter all fields')
  }
  //Check if username already exists
  const usernameExists = await User.findOne({ username })
  if (usernameExists) {
    res.status(400)
    throw new Error('This Username already exists')
  }
  //Check if email already exists
  const emailExists = await User.findOne({ email })
  if (emailExists) {
    res.status(400)
    throw new Error('This Email already exists')
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
    username,
    password,
  })
  const token = generateToken(user._id)
  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    username: user.username,
    role: user.role,
    mobile: user.mobile,
    profileImage: user.profileImage,
    token,
  })
})

//@desc  Get Current User
//@route GET /api/auth/me
//@access Private
const profile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('-password')
  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }
  const token = generateToken(user._id)

  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    username: user.username,
    role: user.role,
    mobile: user.mobile,
    profileImage: user.profileImage,
    token,
  })
})

export { login, loginWithUsername, register, profile }
