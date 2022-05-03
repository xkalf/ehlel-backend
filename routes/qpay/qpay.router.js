const { getAccesstoken, getRefreshtoken, qpayCallback } = require('./qpay.controller')

const router = require('express').Router()

router.get('/token', getAccesstoken)
router.get('/refresh', getRefreshtoken)
router.get('/:id', qpayCallback)
module.exports = router
