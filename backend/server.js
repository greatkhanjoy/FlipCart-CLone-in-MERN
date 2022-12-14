import dotenv from 'dotenv'
import express from 'express'
// import fileUpload from 'express-fileupload'
import path from 'path'

//Import Files
import connectDB from './config/db.js'
import { errorHandler, notFound } from './middlewares/errorHandler.js'
import authRoutes from './routes/authRoutes.js'
import brandRoutes from './routes/brandRoutes.js'
import cartRoutes from './routes/cartRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'

//Initialization
dotenv.config()
const app = express()
const port = process.env.PORT || 3000

//Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// app.use(fileUpload())

//Routes
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/products', productRoutes)
app.use('/api/brands', brandRoutes)
app.use('/api/carts', cartRoutes)

//Static files
const __dirname = path.resolve()
app.use(express.static(path.join(__dirname, 'public')))

//After Middlwares
app.use(notFound)
app.use(errorHandler)

//Start server
const start = async () => {
  try {
    await connectDB()
    app.listen(port, () => console.log(`Server started on port ${port}`))
  } catch (error) {
    console.log(error)
  }
}

start()
