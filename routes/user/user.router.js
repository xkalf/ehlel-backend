const { getUserById, updateUser, getUser } = require('./user.controller')

const router = require('express').Router()

router.get('/', getUser)
router.get('/:id', getUserById)
router.put('/:id', updateUser)

module.exports = router
