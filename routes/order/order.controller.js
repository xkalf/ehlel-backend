const Order = require('../../models/order.model')

const getOrder = async (req, res) => {
  try {
    const orders = Order.find()
    if (!orders) return res.status(500).json({ err: 'orders not found' })
    return res.status(200).json(orders)
  } catch (error) {
    return res.status(500).json(error)
  }
}

module.exports = {
  getOrder
}
