const { getUserById, updateUser } = require('./user.controller')

const router = require('express').Router()

router.get('/:id', getUserById)
router.put('/:id', updateUser)

module.exports = router
