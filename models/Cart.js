const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    products: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, required: true },
        quantity: { type: Number, default: 1 },
      },
    ],
  },
  { timestamp: true }
);

module.exports = mongoose.model("Cart", CartSchema);
