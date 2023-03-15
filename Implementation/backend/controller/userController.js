const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const multer = require("multer");

//register user
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  // Check if user exists
  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    image: req.filename
  })

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
      role: user.role,
      image : user.image
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

//login user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  // Check for user email
  const user = await User.findOne({ email })
  
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
      role: user.role,
      image : user.image
    })
  } else {
    res.status(400)
    throw new Error('Invalid credentials')
  }
})

//get user
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user)
})


//update user
const updateUser = asyncHandler(async (req, res) => {

  const user = await User.findOne({ _id: req.body._id})
  
  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.role = req.body.role || user.role
    user.password = req.body.password || user.password

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      token: generateToken(updatedUser._id),
      role: updatedUser.role
    })
  } else {
    res.status(400)
    throw new Error('update failed')
  }

})



const deleteUser = asyncHandler(async (req, res) => {

  const { email, password } = req.body

  if ( !email || !password) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  const user = await User.findOne({ email })
  
  if (user && (await bcrypt.compare(password, user.password))) {
    const deletedUser = await user.delete()
    res.json({
      _id: deletedUser.id,
      name: deletedUser.name,
      email: deletedUser.email,
      token: generateToken(deletedUser._id),
      role: deletedUser.role,
      message : 'User deleted'
    })
  }
  else {
    res.status(400)
    throw new Error('delete failed')
  }
  
})

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}



module.exports = {
  registerUser,
  loginUser,
  getMe,
  updateUser,
  deleteUser
}
