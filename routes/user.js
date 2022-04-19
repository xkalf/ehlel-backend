const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')

router.put('/:id', async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10)
      req.body.password = await bcrypt.hash(req.body.password, salt)
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
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
  } else {
    return res.status(400).json('You can only update your profile')
  }
})

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findById(id)
    if (!user) res.status(500).json('User not found')
    res.status(200).json(user)
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
