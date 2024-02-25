const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const {protectRoute , admin} = require('../middleware/authMiddleware')

router.get('/profile', protectRoute , userController.getUserProfile)
router.put('/profile', userController.updateUserProfile)
router.get('/' , protectRoute, admin, userController.getUsers)
router.put('/:id', protectRoute, admin ,userController.updateUser)
router.get('/:id', protectRoute, admin ,userController.getUserById)
router.delete('/:id',protectRoute, admin, userController.deleteUser)


module.exports = router