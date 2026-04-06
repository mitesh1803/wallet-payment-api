import User from "../models/user.js"

// GET PROFILE
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password")

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    res.status(200).json(user)

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// SEARCH USERS
const searchUsers = async (req, res) => {
  try {
    const query = req.query.query || ""
    const currentUserId = req.user.id

    const users = await User.find({
      $and: [
        {
          $or: [
            { name: { $regex: query, $options: "i" } },
            { email: { $regex: query, $options: "i" } },
          ],
        },
        {
          _id: { $ne: currentUserId },
        },
      ],
    }).select("_id name email")

    res.status(200).json(users)

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// UPDATE PROFILE
const updateProfile = async (req, res) => {
  try {
    const { name, password } = req.body  // no email — never allow email update

    const user = await User.findById(req.user.id)

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    if (name) { user.name = name }
    if (password) { user.password = password } 
    await user.save()  
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    })

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export { getProfile, searchUsers, updateProfile }