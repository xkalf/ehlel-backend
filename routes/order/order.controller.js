const Order = require('../../models/order.model')
const Product = require('../../models/product.model')
const User = require('../../models/user.model')
const { generateQrCode } = require('../qpay/qpay.controller')

const getOrder = async (req, res) => {
  try {
    const orders = await Order.find().populate('products.product')
    if (!orders) return res.status(500).json({ err: 'orders not found' })
    return res.status(200).json(orders)
  } catch (error) {
    return res.status(500).json(error)
  }
}

const createOrder = async (req, res) => {
  try {
    const newOrder = await new Order(req.body).save()
    if (!newOrder) return res.status(500).json('cannot save')

    const responce = await generateQrCode(newOrder._id)
    if (responce.status === 200) {
      const products = [...newOrder.products]
      let amount = 0
      for (let i = 0; i < products.length; i++) {
        const product = await Product.findById(products[i].product)
        if (product.quantity < products[i].quantity) return res.status(500).json('Product quantity is less')
        product.quantity -= products[i].quantity
        await product.save()
        amount += parseInt(product.priceUSD * products[i].quantity * 3000)
      }
      const user = await User.findById(newOrder.user)
      user.point += parseInt(amount / 100)
      await user.save()
      return res.status(200).json(responce.res)
    } else {
      return res.status(500).json(responce.res)
    }
  } catch (error) {
    return res.status(500).json(error)
  }
}

module.exports = {
  getOrder,
  createOrder
}
