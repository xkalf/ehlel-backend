const Product = require('../../models/product.model')

const createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body).save()
    res.status(200).json(newProduct)
  } catch (err) {
    res.status(500).json(err)
  }
}

const getProduct = async (req, res) => {
  try {
    if (req.query.search) {
      const products = await Product.find({
        title: { $regex: req.query.search }
      })
      res.status(200).json(products)
    } else {
      const select = req.query.select
      const sort = req.query.sort
      delete req.query.select
      delete req.query.sort
      const products = await Product.find(req.query, select).sort(sort).populate('category')
      if (!products) res.status(300).json('products not found')
      res.status(200).json(products)
    }
  } catch (err) {
    res.status(500).json(err)
  }
}

const getProductByTitle = async (req, res) => {
  try {
    const { title } = req.params
    const product = await Product.findOne({ title })
    if (!product) res.status(500).json('Product not found')
    res.status(200).json(product)
  } catch (err) {
    res.status(500).json(err)
  }
}

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        $set: req.body
      },

      {
        new: true
      }
    )
    res.status(200).json(updatedProduct)
  } catch (err) {
    res.status(500).json(err)
  }
}

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params
    const deleted = await Product.findByIdAndDelete(id)
    res.status(200).json(deleted)
  } catch (err) {
    res.status(500).json(err)
  }
}

module.exports = {
  createProduct,
  getProduct,
  getProductByTitle,
  updateProduct,
  deleteProduct
}
