const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    priceMNT: { type: Number, required: true },
    priceUSD: { type: Number, required: true },
    features: { type: String, required: true },
    description: { type: String, required: true },
    photos: { type: Array },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
