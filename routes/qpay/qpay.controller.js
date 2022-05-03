const Qpay = require('../../models/qpay.model')
const Order = require('../../models/order.model')
const axios = require('axios')
const ObjectID = require('mongodb').ObjectId
const getAccesstoken = async (req, res) => {
  try {
    const data = {}

    const response = await axios.post('https://merchant.qpay.mn/v2/auth/token', data, {
      headers: {
        Host: 'merchant.qpay.mn',
        'User-Agent': 'insomnia/2022.2.1',
        Cookie: '_4d45d=http://10.233.105.45:3000',
        'Content-Type': 'application/json',
        Authorization: 'Basic RUhMRUxfQVBQOkI4SWVWbjhl',
        Accept: '*/*',
        'Content-Length': 0
      }
    })
      .then(res => {
        return res.data
      })
      .catch(error => {
        return error
      })
    const filter = { _id: ObjectID('626821f7e36d0edd86bfff4f') }
    const options = { upsert: true }
    const updateDoc = {
      access_token: response.access_token,
      refresh_token: response.refresh_token
    }
    const result = await Qpay.updateOne(filter, updateDoc, options)
    if (result.matchedCount > 0) {
      return res.status(200).json('response')
    }
  } catch (error) {
    return res.status(500).json(error)
  }
}
const getRefreshtoken = async (req, res) => {
  try {
    const keys = await Qpay.findById(ObjectID('626821f7e36d0edd86bfff4f'))
      .then(qpay => {
        return qpay
      })
      .catch(err => {
        console.log(err)
      })
    const data = {}
    const response = await axios.post('https://merchant.qpay.mn/v2/auth/refresh', data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + keys.refresh_token,
        Host: 'merchant.qpay.mn',
        'User-Agent': 'insomnia/2021.2.2',
        Cookie: 'qpay_merchant_service.sid=s%3AFVUMTAKoN-wEhO9x5qM_3FRXTMgP41Q4.6kjdtk6%2FrN%2Bot6iQBuVOk6jG8KwyH3q2BhhFNBh1OkQ; _4d45d=http://10.233.76.223:3000'
      }
    })
      .then(res => {
        if (res.data.error) {
          this.getAccesstoken()
        }
        return res.data
      })
      .catch(error => {
        return error
      })
    const filter = { _id: ObjectID('626821f7e36d0edd86bfff4f') }
    const options = { upsert: true }
    const updateDoc = {
      access_token: response.access_token,
      refresh_token: response.refresh_token
    }
    const result = await Qpay.updateOne(filter, updateDoc, options)
    if (result.matchedCount > 0) {
      return res.status(200).json('response')
    }
  } catch (error) {
    return res.status(500).json(error)
  }
}
const generateQrCode = async (id) => {
  try {
    const keys = await Qpay.findById(ObjectID('626821f7e36d0edd86bfff4f'))
      .then(qpay => {
        return qpay
      })
      .catch(err => {
        console.log(err)
      })
    const order = await Order.findById(id).populate('products.product')
    const products = order.products
    let amount = 0
    for (let i = 0; i < products.length; i++) {
      amount += products[i].product.priceUSD * products[i].quantity
    }
    amount = amount * 3000 - order.point
    const data = {
      invoice_code: 'EHLEL_APP_INVOICE',
      sender_invoice_no: id,
      sender_branch_code: 'branch',
      invoice_receiver_code: 'terminal',
      invoice_description: 'Invoice description',
      callback_url: 'https://www.ehlel.com/qpay/callback/' + id,
      invoice_due_date: null,
      allow_partial: false,
      minimum_amount: null,
      allow_exceed: false,
      maximum_amount: null,
      note: null,
      amount: amount
    }
    const response = await axios.post('https://merchant.qpay.mn/v2/invoice', data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + keys.access_token,
        Host: 'merchant.qpay.mn',
        'User-Agent': 'insomnia/2021.2.2',
        Cookie: 'qpay_merchant_service.sid=s%3AFVUMTAKoN-wEhO9x5qM_3FRXTMgP41Q4.6kjdtk6%2FrN%2Bot6iQBuVOk6jG8KwyH3q2BhhFNBh1OkQ; _4d45d=http://10.233.76.223:3000'
      }
    })
      .then(res => {
        if (res.data.error) {
          this.getAccesstoken()
        }
        return res.data
      })
      .catch(error => {
        return error
      })
    const filter = { _id: ObjectID(id) }
    const options = { upsert: true }
    const updateDoc = {
      invoice_id: response.invoice_id
    }
    const result = await Order.updateOne(filter, updateDoc, options)
    if (result.matchedCount > 0) {
      return {
        status: 200,
        res: response
      }
    }
  } catch (error) {
    return {
      status: 500,
      res: error
    }
  }
}
const qpayCallback = async (req, res) => {
  try {
    const { id } = req.params
    const keys = await Qpay.findById(ObjectID('626821f7e36d0edd86bfff4f'))
      .then(qpay => {
        return qpay
      })
      .catch(err => {
        console.log(err)
      })
    const order = await Order.findById(ObjectID(id))
      .then(order => {
        return order
      })
      .catch(err => {
        console.log(err)
      })
    const data = {
      object_type: 'INVOICE',
      object_id: order.invoice_id,
      offset: {
        page_number: 1,
        page_limit: 100
      }
    }
    const response = await axios.post('https://merchant.qpay.mn/v2/payment/check', data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + keys.access_token,
        Host: 'merchant.qpay.mn',
        'User-Agent': 'insomnia/2021.2.2',
        Cookie: 'qpay_merchant_service.sid=s%3AFVUMTAKoN-wEhO9x5qM_3FRXTMgP41Q4.6kjdtk6%2FrN%2Bot6iQBuVOk6jG8KwyH3q2BhhFNBh1OkQ; _4d45d=http://10.233.76.223:3000'
      }
    })
      .then(res => {
        if (res.data.error) {
          this.getAccesstoken()
        }
        return res.data
      })
      .catch(error => {
        return error
      })
    const filter = { _id: ObjectID(id) }
    const options = { upsert: true }
    const updateDoc = {
      status: 'paid'
    }
    if (response.paid_amount) {
      const result = await Order.updateOne(filter, updateDoc, options)
      return res.status(200).json(result)
    } else {
      return res.status(500).json('unpaid')
    }
  } catch (error) {
    return res.status(500).json('unpaid')
  }
}
module.exports = {
  getAccesstoken,
  getRefreshtoken,
  generateQrCode,
  qpayCallback
}
