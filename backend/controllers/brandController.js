import asyncHandler from 'express-async-handler'
import slugify from 'slugify'
import Brand from '../models/brand.js'

//@desc    - Get all brands
//@route   - GET /api/brands
//@access  - Public
const getBrands = asyncHandler(async (req, res) => {
  const brands = await Brand.find()
  res.status(200).json(brands)
})

//@desc    - Create brand
//@route   - POST /api/brands
//@access  - Private/Admin
const createBrand = asyncHandler(async (req, res) => {
  req.body.slug = slugify(req.body.name, { lower: true })
  req.body.image = ''
  if (req.file) {
    req.body.image = req.file.filename
  }
  const newBrand = await Brand.create(req.body)
  res.status(200).json(newBrand)
})

//@desc    - Get brand
//@route   - GET /api/brands/:id
//@access  - Public
const getBrand = asyncHandler(async (req, res) => {
  const brand = await Brand.findById(req.params.id)
  if (!brand) {
    res.status(404)
    throw new Error('Brand not found')
  }
  res.status(200).json(brand)
})

//@desc    - Update brand
//@route   - PUT /api/brands/:id
//@access  - Private/Admin
const updateBrand = asyncHandler(async (req, res) => {
  const brand = await Brand.findById(req.params.id)
  if (!brand) {
    res.status(404)
    throw new Error('Brand not found')
  }
  req.body.image = brand.image
  if (req.file) {
    req.body.image = req.file.filename
  }
  const updatedBrand = await Brand.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
  res.status(200).json(updatedBrand)
})

//@desc    - Delete brand
//@route   - DELETE /api/brands/:id
//@access  - Private/Admin
const deleteBrand = asyncHandler(async (req, res) => {
  const brand = await Brand.findById(req.params.id)
  if (!brand) {
    res.status(404)
    throw new Error('Brand not found')
  }
  await brand.remove()
  res.status(200).json({ message: 'Brand deleted successfully' })
})

export { getBrands, createBrand, getBrand, updateBrand, deleteBrand }
