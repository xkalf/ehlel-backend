const { getAddressById, createAddress, updateAddress, getAddress } = require('./address.controller')

const router = require('express').Router()

router.get('/', getAddress)
router.get('/:id', getAddressById)
router.post('/', createAddress)
router.put('/:id', updateAddress)

module.exports = router
