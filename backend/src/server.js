import dotenv from 'dotenv'
import express from 'express'

//Initialization
dotenv.config()
const app = express()
const port = process.env.PORT || 3000

//Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Routes

//After Middlwares

//Start server
app.listen(port, () => console.log(`Server is running on ${port}`))
