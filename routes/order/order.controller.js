const Order = require('../../models/order.model')
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
