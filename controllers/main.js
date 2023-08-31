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
  const secretNumber = Math.floor(Math.random() * 100)
  res.status(200).json({
    msg: 'Hello John',
    secret: `Authorized, here is your secret number: ${secretNumber}`
  })
}

module.exports = { login, dashboard }
