const { getCartById, updateCart } = require('./cart.controller')

const router = require('express').Router()

router.get('/:id', getCartById)
router.put('/:id', updateCart)

module.exports = router
