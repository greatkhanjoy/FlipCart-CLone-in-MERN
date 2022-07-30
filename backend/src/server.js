import dotenv from 'dotenv'
import express from 'express'

//Import Files
import connectDB from '../config/db.js'
import { errorHandler, notFound } from '../middlewares/errorHandler.js'
import authRoutes from '../routes/authRoutes.js'
import userRoutes from '../routes/userRoutes.js'

//Initialization
dotenv.config()
const app = express()
const port = process.env.PORT || 3000

//Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Routes
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)

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
