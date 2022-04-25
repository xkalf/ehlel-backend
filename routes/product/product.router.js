const { getProduct, getProductByTitle, createProduct, updatedProduct, deleteProduct } = require('./product.controller')

const router = require('express').Router()

router.get('/', getProduct)
router.get('/:title', getProductByTitle)
router.post('/', createProduct)
router.put('/:id', updatedProduct)
router.delete('/:id', deleteProduct)

module.exports = router
