const bcrypt = require('bcrypt')
const User = require('../../models/user.model')
const Cart = require('../../models/cart.model')

const register = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10)
    const hashPass = await bcrypt.hash(req.body.password, salt)
    const newUser = new User({
      email: req.body.email,
      password: hashPass,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      phone: req.body.phone
    }).save()
    const newCart = await new Cart({
      user: newUser._id
    }).save()
    const { password, ...others } = newCart._doc
    return res.status(200).json(others)
  } catch (err) {
    return res.status(500).json(err)
  }
}

const login = async (req, res) => {
  try {
    const { email } = req.body
    const user = await User.findOne({ email })
    if (!user) return res.status(401).json('Wrong email')

    const validated = await bcrypt.compare(req.body.password, user.password)
    if (!validated) return res.status(422).json('Wrong password')
    else {
      const { password, ...others } = user._doc
      return res.status(200).json(others)
    }
  } catch (err) {
    return res.status(500).json(err)
  }
}

module.exports = {
  register,
  login
}
