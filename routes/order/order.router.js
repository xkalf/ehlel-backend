const { getOrder, createOrder } = require('./order.controller')

const router = require('express').Router()

router.get('/', getOrder)
router.post('/', createOrder)

module.exports = router
