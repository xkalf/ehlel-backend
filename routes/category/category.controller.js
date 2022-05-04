const Category = require('../../models/category.model')

const getCategory = async (req, res) => {
  try {
    const categories = await Category.find()
    if (!categories) return res.status(500).json('Category not found')
    return res.status(200).json(categories)
  } catch (err) {
    return res.status(500).json(err)
  }
}

const getCategoryByName = async (req, res) => {
  try {
    const { name } = req.params
    const category = await Category.findById(name).populate('products')
    if (!category) return res.status(500).json('Category not found')
    return res.status(200).json(category)
  } catch (err) {
    return res.status(500).json(err)
  }
}

const createCategory = async (req, res) => {
  try {
    const newCategory = await Category.create(req.body).save()
    return res.status(200).json(newCategory)
  } catch (err) {
    return res.status(500).json(err)
  }
}

module.exports = {
  getCategory,
  getCategoryByName,
  createCategory
}
