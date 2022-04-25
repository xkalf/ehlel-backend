const ProductMon = require('../../models/productmon.model')

const createProductMon = async (req, res) => {
  try {
    const newProduct = new ProductMon(req.body).save()
    return res.status(200).json(newProduct)
  } catch (err) {
    return res.status(500).json(err)
  }
}

const getProductMon = async (req, res) => {
  try {
    if (req.query.search) {
      const products = await ProductMon.find({ title: { $regex: req.query.search } })
      return res.status(200).json(products)
    }
    const products = await ProductMon.find()
    return res.status(200).json(products)
  } catch (err) {
    return res.status(500).json(err)
  }
}

const getProductMonByTitle = async (req, res) => {
  try {
    const { title } = req.params
    const product = await ProductMon.find({ title })
    if (!product) return res.status(500).json('ProductMon not found')
    return res.status(200).json(product)
  } catch (err) {
    return res.status(500).json(err)
  }
}

const updateProductMon = async (req, res) => {
  try {
    const { id } = req.params
    const updatedProduct = await ProductMon.findByIdAndUpdate(
      id,
      {
        $set: req.body
      },

      {
        new: true
      }
    )
    return res.status(200).json(updatedProduct)
  } catch (err) {
    return res.status(500).json(err)
  }
}

const deleteProductMon = async (req, res) => {
  try {
    const deleted = await ProductMon.findByIdAndDelete(req.params.id)
    return res.status(200).json(deleted)
  } catch (err) {
    return res.status(500).json(err)
  }
}

module.exports = {
  getProductMon,
  getProductMonByTitle,
  createProductMon,
  updateProductMon,
  deleteProductMon
}
