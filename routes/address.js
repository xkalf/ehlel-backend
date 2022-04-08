const router = require('express').Router()
const Address = require('../models/Address')

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const address = Address.findById(id)
    if (!address) res.status(400).json('User not found')
    res.status(200).json(address)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.post('/', async (req, res) => {
  try {
    const newAddress = await new Address(req.body)
    const savedAddress = newAddress.save()
    if (!savedAddress) res.status(402).json('Cannot save')
    res.status(200).json(savedAddress)
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
