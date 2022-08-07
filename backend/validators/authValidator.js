import asyncHandler from 'express-async-handler'
import Joi from 'joi'

const loginSchema = Joi.object().keys({
  password: Joi.string().required(),
  email: Joi.string().email().required(),
})

const loginSchemaTwo = Joi.object().keys({
  password: Joi.string().required(),
  email: Joi.string().email().required(),
})

const registerSchema = Joi.object().keys({
  username: Joi.string().required(),
  password: Joi.string().required(),
  email: Joi.string().email().required(),
  mobile: Joi.string(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
})

const validateLogin = asyncHandler(async (req, res, next) => {
  const result = loginSchema.validate(req.body, { abortEarly: false })
  if (result.error) {
    res.status(400)
    throw new Error(result.error.details[0].message)
  }
  next()
})

const validateLoginTwo = asyncHandler(async (req, res, next) => {
  const result = loginSchemaTwo.validate(req.body, { abortEarly: false })
  if (result.error) {
    res.status(400)
    throw new Error(result.error.details[0].message)
  }
  next()
})

const validateRegistration = asyncHandler(async (req, res, next) => {
  const result = registerSchema.validate(req.body, { abortEarly: false })
  if (result.error) {
    res.status(400)
    throw new Error(result.error.details[0].message)
  }
  next()
})

export { validateLogin, validateLoginTwo, validateRegistration }
