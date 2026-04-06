import User from '../models/user.js'
import generateToken from '../utils/generatetoken.js'
//import {signupschema} from  '../middleware/validators/authvalidator.js'
// SIGNUP
const signup = async (req, res) => {
  console.log("signup hit")
  console.log("body:",req.body)
  try {
    const { name, email, password } = req.body
    console.log("signup try hit")
  
    // // 1. Validate input
    // if (!name || !email || !password) {
    //   return res.status(400).json({ message: 'All fields are required' })
    // }

    // 2. Check if user exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }
    console.log("not found")
  
    // 3. Create user (password auto hashed via pre-save hook)
    const user = await User.create({
      name,
      email,
      password,
      balance: 1000, // for testing
    })
console.log("user created")
  
    // 4. Generate token
    const token = generateToken(user._id)
console.log("token created")
  
    // 5. Send response
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
    })

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// LOGIN
const login = async (req, res) => {
  try {
    const { email, password } = req.body

    // // 1. Validate input
    // if (!email || !password) {
    //   return res.status(400).json({ message: 'All fields are required' })
    // }

    // 2. Find user
    const existUser = await User.findOne({ email })
    if (!existUser) {
      return res.status(400).json({ message: 'Invalid email or password' })
    }

    // 3. Compare password
    const isMatch = await existUser.matchPassword(password)
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    // 4. Generate token
    const token = generateToken(existUser._id)

    // 5. Send response
    res.status(200).json({
      _id: existUser._id,
      name: existUser.name,
      email: existUser.email,
      token,
    })

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export {signup,login}