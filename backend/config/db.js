import mongoose from 'mongoose'

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
    })
    console.log('MongoDB connected')
  } catch (error) {
    console.log(error)
  }
}

export default dbConnect
