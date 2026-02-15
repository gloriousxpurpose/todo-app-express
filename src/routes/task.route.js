const express = require('express')
const router = express.Router()
const {
    getAllTasks,
    createTask,
    updateTask,
    deleteTask,
    getTaskById,
    updateTaskStatus

} = require('../controllers/task.controller')
const {verifyToken} = require('../middlewares/auth.middleware')

router.get('/task', verifyToken, getAllTasks) 
router.post('/task', verifyToken, createTask)
router.patch('/task/:taskId', verifyToken, updateTask)
router.patch('/status/:taskId', verifyToken, updateTaskStatus)
router.delete('/task/:taskId', verifyToken, deleteTask)
router.get('/task/:taskId', verifyToken, getTaskById)

module.exports = router