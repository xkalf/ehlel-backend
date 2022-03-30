const router = require("express").Router();
const Category = require("../models/Category");
const Product = require("../models/Product");

router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    if (!categories) res.status(500).json("Category not found");
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  const category = await Product.find({ categoryId: req.params.id });
  if (!category) res.status(500).json("Category not found");
  res.status(200).json(category);
});

router.post("/", async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
