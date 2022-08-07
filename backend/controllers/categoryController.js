import asyncHandler from 'express-async-handler'
import slugify from 'slugify'
import Category from '../models/category.js'

//@desc    - Get category tree
function createCategories(categories, parentId = null) {
  const categoryList = []
  let category
  if (parentId == null) {
    category = categories.filter(
      (cat) => cat.parentId == null || cat.parentId == ''
    )
  } else {
    category = categories.filter((cat) => cat.parentId == parentId)
  }

  for (let cate of category) {
    categoryList.push({
      _id: cate.id,
      name: cate.name,
      slug: cate.slug,
      description: cate.description,
      image: cate.image,
      parentId: cate.parentId,
      children: createCategories(categories, cate._id),
    })
  }

  return categoryList
}

//@desc    - All categories
//@route   - GET /api/categories
//@access  - Public
const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find()

  if (categories) {
    const categoryList = await createCategories(categories)
    return res.status(200).json(categoryList)
  }

  res.status(404).json(categories)
})

//@desc    - Create category
//@route   - POST /api/categories
//@access  - Private/Admin
const createCategory = asyncHandler(async (req, res) => {
  const slugExists = await Category.findOne({
    slug: slugify(req.body.name, { lower: true }),
  })
  if (slugExists) {
    const newSlug =
      req.body.name + '-' + Math.floor(Math.random() * (10 - 0 + 1))
    req.body.slug = slugify(newSlug, { lower: true })
  } else {
    req.body.slug = slugify(req.body.name, { lower: true })
  }

  req.body.image = ''
  if (req.file) {
    req.body.image = `/uploads/${req.file.filename}`
  }

  const newCategory = await Category.create(req.body)
  res.status(200).json(newCategory)
})

//@desc    - Get category
//@route   - GET /api/categories/:id
//@access  - Public
const getCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id)

  if (!category) {
    res.status(404)
    throw new Error('Category not found')
  }
  res.status(200).json(category)
})

//@desc    - Update category
//@route   - PUT /api/categories/:id
//@access  - Private/Admin
const updateCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id)
  if (!category) {
    res.status(404)
    throw new Error('Category not found')
  }

  req.body.image = category.image
  if (req.file) {
    req.body.image = `/uploads/${req.file.filename}`
  }

  const categoryUpdate = await Category.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  )
  res.status(200).json(categoryUpdate)
})

//@desc    - Delete category
//@route   - DELETE /api/categories/:id
//@access  - Private/Admin
const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id)
  if (!category) {
    res.status(404)
    throw new Error('Category not found')
  }
  await category.remove()
  res.status(200).json({ success: true })
})

export {
  getCategories,
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
}
