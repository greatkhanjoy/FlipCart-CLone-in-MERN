import { body, check, validationResult } from 'express-validator'

const loginValidator = [
  check('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Email is invalid'),
  check('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 chars long'),
  body('email').normalizeEmail().escape(),
  body('password').escape(),
]
const loginValidatorTwo = [
  check('username')
    .notEmpty()
    .withMessage('Username is required')
    .isLength({ min: 3 })
    .withMessage('Username must be at least 3 chars long'),
  check('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 chars long'),
  body('username').trim().escape(),
  body('password').escape(),
]

const ValidateNewUser = [
  check('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Email is invalid'),
  check('username')
    .notEmpty()
    .withMessage('Username is required')
    .isLength({ min: 3 })
    .withMessage('Username must be at least 3 chars long'),
  check('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 chars long'),
  check('mobile').notEmpty().withMessage('Mobile number is required'),
  check('role').notEmpty().withMessage('Please select a role'),
  check('firstName').notEmpty().withMessage('First name is required'),
  check('lastName').notEmpty().withMessage('Last name is required'),

  body('email').normalizeEmail().escape(),
  body('username').trim().escape(),
  body('password').escape(),
  body('mobile').escape(),
  body('role').escape(),
  body('firstName').escape(),
  body('lastName').escape(),
]

const ValidateCategory = [
  check('name')
    .notEmpty()
    .withMessage('Category name is required')
    .isLength({ min: 2 })
    .withMessage('Category must be at least 2 chars long'),
  body('name').escape(),
  body('parentId').escape(),
  body('description').escape(),
  body('image').escape(),
]

const ValidateProduct = [
  check('name')
    .notEmpty()
    .withMessage('Product name is required')
    .isLength({ min: 2 })
    .withMessage('Product name must be at least 2 chars long'),
  check('description')
    .notEmpty()
    .withMessage('Product Description is required')
    .isLength({ min: 2 })
    .withMessage('Product Description must be at least 2 chars long'),
  check('price')
    .notEmpty()
    .withMessage('Product Price is required')
    .isInt({ min: 0 })
    .withMessage('Product Price must be in Number'),
  body('name').escape(),
  body('price').escape(),
  body('description').escape(),
  body('image').escape(),
  body('stock').escape(),
  body('offer').escape(),
]

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    // res.status(422)
    // throw new Error('Validation failed')
    const errorList = errors.array().map((error) => {
      return {
        message: error.msg,
        param: error.param,
      }
    })
    return res
      .status(400)
      .json({ message: errors.array()[0].msg, errors: errorList })
  }
  next()
}

export {
  loginValidator,
  loginValidatorTwo,
  ValidateNewUser,
  ValidateCategory,
  ValidateProduct,
  validate,
}
