import asyncHandler from 'express-async-handler'
import User from '../models/user.js'

//@desc    -   Get all users
//@route   -   GET /api/users
//@access  -   Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password')
  res.status(200).json(users)
})

//@desc   - Create user
//@route  - POST /api/auth/users
//@access - Private/Admin
const createUser = asyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    username,
    password,
    role,
    mobile,
    profileImage,
  } = req.body

  if (
    !firstName ||
    !lastName ||
    !email ||
    !username ||
    !password ||
    !role ||
    !mobile ||
    !profileImage
  ) {
    res.status(400)
    throw new Error('Please enter all required fields')
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
    role,
    mobile,
    profileImage,
  })

  res.status(200).json({ message: 'User created successfully' })
})

export { getUsers, createUser }
