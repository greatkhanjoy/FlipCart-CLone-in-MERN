import asyncHandler from 'express-async-handler'
import slugify from 'slugify'
import Product from '../models/product.js'

//@desc    - Get all products
//@route   - GET /api/products
//@access  - Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find()
  res.status(200).json(products)
})

//@desc    - Get single product
//@route   - GET /api/products/:id
//@access  - Public
const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (!product) {
    res.status(404)
    throw new Error('Product not found')
  }
  res.status(200).json(product)
})

//@desc    - Create product
//@route   - POST /api/products
//@access  - Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  req.body.slug = slugify(req.body.name, { lower: true })
  req.body.createdBy = req.user._id
  req.body.images = []
  if (req.files.length > 0) {
    req.body.images = req.files.map((file) => {
      return { img: file.filename }
    })
  }
  const newProduct = await Product.create(req.body)

  if (!newProduct) {
    res.status(400)
    throw new Error('Something went wrong while creating product!')
  }
  res.status(200).json(newProduct)
})

//@desc    - Update product
//@route   - PUT /api/products/:id
//@access  - Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const checkProduct = await Product.findById(req.params.id)
  if (!checkProduct) {
    res.status(404)
    throw new Error('Product not found')
  }

  req.body.images = checkProduct.images
  if (req.files.length > 0) {
    req.body.images = req.files.map((file) => {
      return { img: file.filename }
    })
  }

  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })
  res.status(200).json(product)
})

//@desc    - Delete product
//@route   - DELETE /api/products/:id
//@access  - Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (!product) {
    res.status(404)
    throw new Error('Product not found')
  }
  await product.remove()
  res.status(200).json(product)
})

export { getProducts, getProduct, createProduct, updateProduct, deleteProduct }
