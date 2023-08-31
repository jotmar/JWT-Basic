// Async errors handler lib
require('express-async-errors')

// Express

const express = require('express')
const app = express()
const mainRouter = require('./routes/main')

// DB

const connectDB = require('./db/connect')
require('dotenv').config()

// Variables

const port = process.env.PORT

// Middlewares Import

const notFound = require('./middleware/not-found')
const errorHandler = require('./middleware/error-handler')

// Middlewares Core --- Comes Firts

app.use(express.static('./public'))
app.use(express.json())
app.use('/api/v1', mainRouter)

// Middlewares

app.use(errorHandler)
app.use(notFound)

// Start Func

const start = async () => {
  try {
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()
