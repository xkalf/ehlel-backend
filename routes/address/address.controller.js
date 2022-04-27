const Address = require('../../models/address.model')

const getAddress = async (req, res) => {
  try {
    const addresses = await Address.find()
    if (addresses) return res.status(200).json(addresses)
    else return res.status(500).json('Addresses not found')
  } catch (error) {
    return res.status(500).json(error)
  }
}

const getAddressById = async (req, res) => {
  try {
    const { id } = req.params
    const address = await Address.findById(id)
    if (!address) res.status(400).json('User not found')
    return res.status(200).json(address)
  } catch (err) {
    return res.status(500).json(err)
  }
}

const createAddress = async (req, res) => {
  try {
    const newAddress = await new Address(req.body).save()
    if (!newAddress) return res.status(402).json('Cannot save')
    return res.status(200).json(newAddress)
  } catch (err) {
    return res.status(500).json(err)
  }
}

const updateAddress = async (req, res) => {
  try {
    const { id } = req.params
    const updatedAddress = await Address.findByIdAndUpdate(
      id,
      {
        $set: req.body
      },

      {
        new: true
      }
    )
    return res.status(200).json(updatedAddress)
  } catch (err) {
    return res.status(500).json(err)
  }
}

module.exports = {
  getAddress,
  getAddressById,
  createAddress,
  updateAddress
}
