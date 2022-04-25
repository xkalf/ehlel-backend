const { getOrder } = require('./order.controller')

const router = require('express').Router()

router.get('/', getOrder)

module.exports = router
