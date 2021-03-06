const mongoose = require('mongoose')

const ProductMonSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true
    },
    priceMNT: { type: Number, required: true },
    features: { type: String, required: true },
    description: [{ type: String }],
    quantity: { type: Number, default: 0 },
    photos: [{
      type: String
    }]
  },
  { timestamps: true }
)

module.exports = mongoose.model('ProductMon', ProductMonSchema)
