const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1]

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      // Get user from the token
      req.user = await User.findOne({_id:decoded.id }).select('-password')

      if(req.user == null)
        throw new Error

      next()
    } catch (error) {
      console.log(error)
      res.status(401)
      throw new Error('Not authorized')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})

const userProtect = asyncHandler(async (req, res, next) => {
  if (req.user.role == 'USER') {
    next()
  } else {
    res.status(401)
    throw new Error('Not authorized, not a USER')
  }
})

const adminProtect = asyncHandler(async (req, res, next) => {
  if (req.user.role == 'ADMIN') {
    next()
  } else {
    res.status(401)
    throw new Error('Not authorized, not an ADMIN')
  }
})

const shelterProtect = asyncHandler(async (req, res, next) => {
  if (req.user.role == 'SHELTER') {
    next()
  } else {
    res.status(401)
    throw new Error('Not authorized, not a SHELTER_MANAGER')
  }
})

const eventProtect = asyncHandler(async (req, res, next) => {
  if (req.user.role == 'EVENT') {
    next()
  } else {
    res.status(401)
    throw new Error('Not authorized, not an EVENT_MANAGER')
  }
})

module.exports = { protect , userProtect , adminProtect }