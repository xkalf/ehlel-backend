const router = require('express').Router()
const ProductMon = require('../models/ProductMon')

router.post('/', async (req, res) => {
  try {
    const newProduct = new ProductMon(req.body)
    const savedProduct = await newProduct.save()
    res.status(200).json(savedProduct)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/', async (req, res) => {
  try {
    if (req.query.search) {
      const products = await ProductMon.find({ title: { $regex: req.query.search } })
      res.status(200).json(products)
    }
    const products = await ProductMon.find()
    res.status(200).json(products)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/:title', async (req, res) => {
  try {
    const { title } = req.params
    const product = ProductMon.find({ title })
    if (!product) res.status(500).json('ProductMon not found')
    res.status(200).json(product)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.put('/:id', async (req, res) => {
  try {
    if (req.params.id === req.body.id) {
      const updatedProduct = await ProductMon.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body
        },

        {
          new: true
        }
      )
      res.status(200).json(updatedProduct)
    }
  } catch (err) {
    res.status(500).json(err)
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const deleted = await ProductMon.findByIdAndDelete(req.params.id)
    res.status(200).json(deleted)
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
