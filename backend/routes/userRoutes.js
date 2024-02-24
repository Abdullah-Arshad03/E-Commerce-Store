const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')


router.get('/profile', userController.getUserProfile)
router.put('/profile', userController.updateUserProfile)
router.get('/' , userController.getUsers)
router.put('/:id', userController.updateUser)
router.get('/:id', userController.getUserById)
router.delete('/:id', userController.deleteUser)


module.exports = router