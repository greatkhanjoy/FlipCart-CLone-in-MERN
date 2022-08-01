import mongoose from 'mongoose'
const Schema = mongoose.Schema

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
    },
    parentId: {
      type: String,
      default: null,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
)

export default mongoose.model('Category', CategorySchema)
