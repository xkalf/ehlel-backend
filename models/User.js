const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    point: { type: Number, default: 0 },
    isAdmin: { type: Boolean, required: true }
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
)

UserSchema.virtual('addresses', {
  ref: 'Address',
  localField: '_id',
  foreignField: 'user',
  justOne: false
})

module.exports = mongoose.model('User', UserSchema)
