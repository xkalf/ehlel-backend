const Cart = require('../../models/cart.model')

const getCartById = async (req, res) => {
  try {
    const { id } = req.params
    const cart = await Cart.find({ user: id })
    if (!cart) return res.status(500).json('Cart not found!')
    return res.status(400).json(cart)
  } catch (err) {
    return res.status(500).json(err)
  }
}

const updateCart = async (req, res) => {
  try {
    const { id } = req.params
    const cart = Cart.findByIdAndUpdate(
      id,
      {
        $set: req.body
      },
      {
        new: true
      }
    )
    return res.status(200).json(cart)
  } catch (err) {
    return res.status(500).json(err)
  }
}

module.exports = {
  getCartById,
  updateCart
}