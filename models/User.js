const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    phone: { type: String, required: true },
    point: { type: Number, default: 0 },
    isAdmin: { type: Boolean, required: true },
    addresses: { type: Array },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Use", UserSchema);
