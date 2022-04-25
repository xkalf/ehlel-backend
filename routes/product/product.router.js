const { getProduct, getProductByTitle, createProduct, updateProduct, deleteProduct } = require('./product.controller')

const router = require('express').Router()

router.get('/', getProduct)
router.get('/:title', getProductByTitle)
router.post('/', createProduct)
router.put('/:id', updateProduct)
router.delete('/:id', deleteProduct)

module.exports = router
