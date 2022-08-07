import asyncHandler from 'express-async-handler'
import Joi from 'joi'

const categorySchema = Joi.object().keys({
  name: Joi.string().required(),
  description: Joi.string(),
  image: Joi.string(),
  parentId: Joi.string(),
})

const validateCategory = asyncHandler(async (req, res, next) => {
  const result = categorySchema.validate(req.body, { abortEarly: false })
  if (result.error) {
    res.status(400)
    throw new Error(result.error.details[0].message)
  }
  next()
})

export default validateCategory
