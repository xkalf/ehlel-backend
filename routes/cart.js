const router = require('express').Router()
const Cart = require('../models/Cart')

router.get('/', (req, res) => {
  try {
    const id = req.body.user
    const cart = Cart.find({ user: id })
    if (!cart) res.status(500).json('Cart not found!')
    res.status(400).json(cart)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.put('/', (req, res) => {
  try {
    const id = req.body._id
    const cart = Cart.findByIdAndUpdate(
      id,
      {
        $set: req.body
      },
      {
        new: true
      }
    )
    res.status(200).json(cart)
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
