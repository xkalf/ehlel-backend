const { getAddressById, createAddress, updateAddress } = require('./address.controller')

const router = require('express').Router()

router.get('/:id', getAddressById)
router.post('/', createAddress)
router.put('/:id', updateAddress)

module.exports = router
