const router = require("express").Router();
const Product = require("../models/Product");

router.post("/", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    let products;
    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(20);
    } else {
      products = Product.find();
    }
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    if (req.params.id == req.body.id) {
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },

        {
          new: true,
        }
      );
      res.status(200).json(updatedProduct);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleted = Product.findByIdAndDelete(req.params.id);
    res.status(200).json(deleted);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
