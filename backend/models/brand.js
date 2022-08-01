import mongoose from 'mongoose'
const Schema = mongoose.Schema

const BrandSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters long'],
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

export default mongoose.model('Brand', BrandSchema)
