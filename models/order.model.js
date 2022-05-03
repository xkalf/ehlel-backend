const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  products: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: {
      type: Number,
      required: true
    }
  }],
  address: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  point: {
    type: Number,
    default: 0
  }
}, {
  invoice_id: { type: String, required: false },
  status: { type: String, required: false },
  timestamps: true
})

module.exports = mongoose.model('Order', OrderSchema)
