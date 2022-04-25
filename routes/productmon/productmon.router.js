const { getProductMon, getProductMonByTitle, createProductMon, updateProductMon, deleteProductMon } = require('./productmon.controller')

const router = require('express').Router()

router.get('/', getProductMon)
router.get('/:title', getProductMonByTitle)
router.post('/', createProductMon)
router.put('/', updateProductMon)
router.delete('/', deleteProductMon)

module.exports = router
