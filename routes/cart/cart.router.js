const { getCartById, updateCart } = require('./cart.controller')

const router = require('express').Router()

router.get('/:id', getCartById)
router.put('/', updateCart)

module.exports = router
