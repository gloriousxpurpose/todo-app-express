const taskModel = require('../models/task.model')
const {errorHandler, successHandler} = require('../utils/responses')

const getAllTasks = async (req, res) => {
    try {
        const userId = req.user.userId // Get from JWT token
        
        // Extract query parameters
        const { priority, sortOrder, search } = req.query

        // Validate priority if provided
        if (priority && !['High', 'Medium', 'Low'].includes(priority)) {
            return errorHandler(
                res,
                false,
                400,
                "Priority harus High, Medium, atau Low"
            )
        }

        // Validate sortOrder if provided
        if (sortOrder && !['desc', 'asc'].includes(sortOrder)) {
            return errorHandler(
                res,
                false,
                400,
                "sortOrder harus desc atau asc"
            )
        }

        // Build filters object
        const filters = {
            priority,
            sortOrder, // 'asc' or 'desc' (default is 'desc')
            search
        }

        const allTasks = await taskModel.getAllTasks(userId, filters)

        if (!allTasks || allTasks.length === 0) {
            return errorHandler(
                res,
                false,
                404,
                "Belum ada task"
            )
        }
        
        return successHandler(
            res,
            true,
            200,
            "Menampilkan seluruh task",
            allTasks
        )

    } catch (error) {
        return errorHandler(
            res, 
            false, 
            500, 
            `Internal Server Error: ${error.message}`)        
    }
}

const createTask = async (req, res) => {
    try {
        const { title, deadline, priority, is_done = false } = req.body

        const userId = req.user.userId // Get from JWT token

        if (!title || !deadline || !priority) {
            return errorHandler(
                res, 
                false, 
                400, 
                "Title, deadline, dan priority wajib diisi")
        }        

        const createdTask = await taskModel.createTask(
            userId,  // Add user_id here
            title,  
            deadline,
            priority,
            is_done
        )

        if (createdTask.rowCount === 0) {
            return errorHandler(
                res, 
                false, 
                400, 
                "Gagal membuat task")
        }
                
        return successHandler(
            res, 
            true, 
            201, 
            "Task berhasil dibuat", 
            createdTask.rows[0]) // Return the created task

    } catch (error) {
        return errorHandler(
            res, 
            false, 
            500, 
            `Internal Server Error: ${error.message}`)
    }
}
const updateTask = async (req, res) => {
    try {
        const {taskId} = req.params

        const {title, deadline, priority} = req.body 

        if (!title || !deadline || !priority) {

            return errorHandler(
                res, 
                false, 
                400, 
                "Semua field wajib diisi")}

        const updatedTask = await taskModel.updateTask(taskId, title, deadline, priority)

        if (updatedTask.rowCount === 0) {
            return errorHandler(
                res, 
                false, 
                404, 
                "Gagal mengupdate task")
        }

        return successHandler(
            res, 
            true, 
            200, 
            "Task berhasil diperbarui", 
            updatedTask.rows[0])        
        
    } catch (error) {

        return errorHandler(
            res, 
            false, 
            500, 
            `Internal Server Error: ${error.message}`)
    }
}

const deleteTask = async (req, res) => {
    
    try {

        const {taskId} = req.params

        const task = await taskModel.getTaskById(taskId)

        if (!task || task.length === 0) {

            return errorHandler(
                res, 
                false, 
                404, 
                "Task tidak ditemukan")
        }
        
        const deletedTask = await taskModel.deleteTask(taskId)

        if (deletedTask.rowCount === 0) {

            return errorHandler(
                res, 
                false, 
                404, 
                "Task tidak ditemukan")}

        return successHandler(

            res, 
            true, 
            200, 
            "Task berhasil dihapus", 
            {task})
            
    } catch (error) {

        return errorHandler(
        res, 
        false, 
        500, 
        `Internal Server Error: ${error.message}`)

    }
}

const getTaskById = async (req, res) => {
    try {
        const {taskId} = req.params

        const task = await taskModel.getTaskById(taskId)

        if (!task || task.length === 0) {

            return errorHandler(
                res, 
                false, 
                404, 
                "Task tidak ditemukan")}

        return successHandler(
            res, 
            true, 
            200, 
            "Task berhasil ditemukan", 
            task)

    } catch (error) {

        return errorHandler(
            res, 
            false, 
            500, 
            `Internal Server Error: ${error.message}`)}
}

const updateTaskStatus = async (req, res) => {
    try {
        const { taskId } = req.params
        const { is_done } = req.body

        // Validate is_done field
        if (is_done === undefined || is_done === null) {
            return errorHandler(
                res,
                false,
                400,
                "Field is_done wajib diisi"
            )
        }

        // Check if todo exists
        const task = await taskModel.getTaskById(taskId)
        if (!task) {
            return errorHandler(
                res,
                false,
                404,
                "Todo tidak ditemukan"
            )
        }

        // Update status
        const updatedStatus = await taskModel.updateTaskStatus(is_done, taskId )

        if (updatedStatus.rowCount === 0) {
            return errorHandler(
                res,
                false,
                404,
                "Gagal mengupdate status todo"
            )
        }

        const updatedData = updatedStatus.rows

        return successHandler(
            res,
            true,
            200,
            "Status todo berhasil diperbarui",
            {updatedData}
        )

    } catch (error) {
        return errorHandler(
            res,
            false,
            500,
            `Internal Server Error: ${error.message}`
        )
    }
}

module.exports = {
    getAllTasks,
    createTask,
    updateTask,
    deleteTask,
    getTaskById,
    updateTaskStatus
}