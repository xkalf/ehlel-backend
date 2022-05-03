const Cart = require('../../models/cart.model')

const getCart = async (req, res) => {
  try {
    const carts = await Cart.find()
    if (!carts || carts.length === 0) return res.status(500).json('cart not found')
    return req.status(200).json(carts)
  } catch (error) {
    return res.status(500).json(error)
  }
}

const getCartById = async (req, res) => {
  try {
    const { id } = req.params
    const cart = await Cart.findOne({ user: id })
    if (!cart) return res.status(500).json('Cart not found!')
    return res.status(200).json(cart)
  } catch (err) {
    return res.status(500).json(err)
  }
}

const updateCart = async (req, res) => {
  try {
    const { user } = req.body
    const cart = await Cart.findOneAndUpdate({ user }, req.body)
    return res.status(200).json(cart)
  } catch (err) {
    return res.status(500).json(err)
  }
}

module.exports = {
  getCartById,
  getCart,
  updateCart
}
