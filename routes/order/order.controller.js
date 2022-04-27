const Order = require('../../models/order.model')

const getOrder = async (req, res) => {
  try {
    const orders = await Order.find()
    if (!orders) return res.status(500).json({ err: 'orders not found' })
    return res.status(200).json(orders)
  } catch (error) {
    return res.status(500).json(error)
  }
}

const createOrder = async (req, res) => {
  try {
    const newOrder = await new Order(req.body).save()
    if (newOrder) return res.status(200).json(newOrder)
    else return res.status(500).json('cannot save')
  } catch (error) {
    return res.status(500).json(error)
  }
}

module.exports = {
  getOrder,
  createOrder
}
