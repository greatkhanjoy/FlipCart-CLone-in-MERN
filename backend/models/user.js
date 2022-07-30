import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'
const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
      minlength: [3, 'First name must be at least 3 characters long'],
      maxlength: [20, 'First name must be at most 20 characters long'],
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
      minlength: [3, 'Last name must be at least 3 characters long'],
      maxlength: [20, 'Last name must be at most 20 characters long'],
    },
    username: {
      type: String,
      required: [true, 'Username is required'],
      trim: true,
      unique: true,
      index: true,
      lowercase: true,
      minlength: [3, 'Username must be at least 3 characters long'],
      maxlength: [20, 'Username must be at most 20 characters long'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password must be at least 8 characters long'],
      maxlength: [20, 'Password must be at most 20 characters long'],
    },
    role: {
      type: String,
      enum: {
        values: ['admin', 'user'],
        message: 'Role must be either admin or user',
      },
      default: 'user',
    },
    mobile: {
      type: String,
    },
    profileImage: {
      type: String,
    },
  },
  { timeStamps: true }
)

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password)
}

export default mongoose.model('User', userSchema)
