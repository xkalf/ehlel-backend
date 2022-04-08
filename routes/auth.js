const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const Cart = require('../models/Cart')

router.post('/register', async (req, res) => {
  const salt = await bcrypt.genSalt(10)
  const hashPass = await bcrypt.hash(req.body.password, salt)
  const newUser = new User({
    email: req.body.email,
    password: hashPass,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    phone: req.body.phone
  })

  try {
    const savedUser = await newUser.save()
    const newCart = new Cart({
      user: savedUser._id
    })
    newCart.save()
    res.status(201).json(savedUser)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (!user) res.status(401).json('Wrong email')

    const validated = await bcrypt.compare(req.body.password, user.password)
    if (!validated) res.status(422).json('Wrong password')
    const { password, ...others } = user._doc
    res.status(200).json(others)
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
