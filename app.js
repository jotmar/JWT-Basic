// Variables
const port = 3000

// Async errors handler lib
require('express-async-errors')

// Express

const express = require('express')
const app = express()

// DB

const connectDB = require('./db/connect')
require('dotenv').config()

// Middlewares Import

const notFound = require('./middleware/not-found')
const errorHandler = require('./middleware/error-handler')

// Middlewares

app.use(express.static('./public'))
app.use(express.json())
app.use(errorHandler)
app.use(notFound)

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()
