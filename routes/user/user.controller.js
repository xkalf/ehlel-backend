const User = require('../../models/user.model')
const bcrypt = require('bcrypt')

const updateUser = async (req, res) => {
  if (req.body.password) {
    const salt = await bcrypt.genSalt(10)
    req.body.password = await bcrypt.hash(req.body.password, salt)
  }
  try {
    const { id } = req.params
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        $set: req.body
      },
      {
        new: true
      }
    )
    return res.status(200).json(updatedUser)
  } catch (err) {
    return res.status(500).json(err)
  }
}

const getUserById = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findById(id)
    if (!user) return res.status(500).json('User not found')
    return res.status(200).json(user)
  } catch (err) {
    return res.status(500).json(err)
  }
}

module.exports = {
  getUserById,
  updateUser
}
