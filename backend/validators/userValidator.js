import asyncHandler from 'express-async-handler'
import Joi from 'joi'

const userSchema = Joi.object().keys({
  username: Joi.string().required(),
  password: Joi.string().required(),
  email: Joi.string().email().required(),
  mobile: Joi.string(),
  role: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
})

const validateUser = asyncHandler(async (req, res, next) => {
  const result = userSchema.validate(req.body, { abortEarly: false })
  if (result.error) {
    res.status(400)
    throw new Error(result.error.details[0].message)
  }
  next()
})

export default validateUser
