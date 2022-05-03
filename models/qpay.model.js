const mongoose = require('mongoose')

const qpay = new mongoose.Schema({
  access_token: { type: String, required: true },
  refresh_token: { type: String, required: true }
})

module.exports = mongoose.model('Qpay', qpay)
