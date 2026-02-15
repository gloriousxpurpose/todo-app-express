const router = require('express').Router()
const {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
    getUserById,
    loginUser,
    verifyEmail,
    getMe
} = require('../controllers/user.controller')
const {verifyToken} = require('../middlewares/auth.middleware')
const {authorizeRole} = require('../middlewares/role.middleware')

router.get('/user',verifyToken, authorizeRole(['admin']), getAllUsers) 
router.put('/user/:userId',verifyToken, updateUser)
router.delete('/user/:userId',verifyToken,authorizeRole(['admin']), deleteUser)
router.get('/user/:userId',verifyToken, getUserById)
router.get('/me', verifyToken, getMe)

router.post('/login', loginUser)
router.post('/register', createUser)
router.get('/verify-email', verifyEmail)

module.exports = router