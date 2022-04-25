const { getCategory, getCategoryByName, createCategory } = require('./category.controller')

const router = require('express').Router()

router.get('/', getCategory)
router.get('/:name', getCategoryByName)
router.post('/', createCategory)

module.exports = router
