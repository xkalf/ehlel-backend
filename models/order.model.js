const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  products: [{
    product: mongoose.Schema.Types.ObjectId,
    quantity: {
      type: Number,
      required: true
    }
  }],
  address: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Order', OrderSchema)
