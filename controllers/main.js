require('express-async-errors')
const jwt = require('jsonwebtoken')
const CustomError = require('../errors/custom-error')

const login = async (req, res) => {
  const { password, username } = req.body
  console.log(password, username)
  if (!password || !username) {
    throw new CustomError('Please provide an email and password!', 400)
  }

  const id = new Date().getTime()

  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  })

  res.status(200).json({ msg: 'User created!', token })
}

const dashboard = async (req, res) => {
  const authHeader = req.headers.authorization
  const token = authHeader.split(' ')[1]
  console.log(token)
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new CustomError('No token was given', 401)
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    console.log(decoded)
    const secretNumber = Math.floor(Math.random() * 100)
    res.status(200).json({
      msg: `Hello, ${decoded.username}`,
      secret: `Authorized, here is your secret number: ${secretNumber}`
    })
  } catch (error) {
    throw new CustomError('Invalid Token!', 401)
  }
}

module.exports = { login, dashboard }
