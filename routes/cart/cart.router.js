const { getCartById, updateCart, getCart } = require('./cart.controller')

const router = require('express').Router()

router.get('/', getCart)
router.get('/:id', getCartById)
router.put('/:id', updateCart)

module.exports = router
