import mongoose from 'mongoose'
const Schema = mongoose.Schema

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Product Name is required'],
      minlength: [3, 'Product Name must be at least 3 characters long'],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Product Slug is required'],
      unique: true,
    },
    description: {
      type: String,
      required: [true, 'Product Description is required'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Product Price is required'],
      min: [0, 'Product Price must be greater than 0'],
    },
    salePrice: {
      type: Number,
      min: [0, 'Product Sale Price must be greater than 0'],
      default: null,
    },
    stock: {
      type: Number,
      default: 0,
    },
    offer: {
      type: Number,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Product Category is required'],
    },
    brand: {
      type: Schema.Types.ObjectId,
      ref: 'Brand',
    },
    images: [{ img: { type: String } }],
    reviews: [
      {
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        review: { type: String, required: [true, 'Review is required'] },
        rating: {
          type: Number,
          required: [true, 'Rating is required'],
          min: [1, 'Rating must be greater than 1'],
          max: [5, 'Rating must be less than 5'],
        },
      },
    ],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Created By is required'],
    },
    status: {
      type: String,
      enum: {
        values: ['published', 'draft', 'trash'],
      },
      default: 'draft',
    },
  },
  { timestamps: true }
)

export default mongoose.model('Product', productSchema)
