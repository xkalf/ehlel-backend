const router = require('express').Router()
const Category = require('../models/Category')

router.get('/', async (req, res) => {
  try {
    const categories = await Category.find()
    if (!categories) res.status(500).json('Category not found')
    res.status(200).json(categories)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/:id', async (req, res) => {
  const { id } = req.params
  const category = await Category.findById(id).populate('products')
  if (!category) res.status(500).json('Category not found')
  res.status(200).json(category)
})

router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create(req.body)
    const savedCategory = await newCategory.save()
    res.status(200).json(savedCategory)
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
