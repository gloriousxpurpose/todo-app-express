const pool = require('../database/connection')
const { v4: uuidv4 } = require('uuid')

const getAllTasks = (userId, filters = {}) =>
    new Promise((resolve, reject) => {
        let sql = `
            SELECT task_id, title, created_at, deadline, priority, is_done, completed_at 
            FROM tasks 
            WHERE user_id = $1`
        
        const params = [userId]
        let paramCount = 1

        // Filter by priority
        if (filters.priority) {
            paramCount++
            sql += ` AND priority = $${paramCount}`
            params.push(filters.priority)
        }

        // Search by title
        if (filters.search) {
            paramCount++
            sql += ` AND title ILIKE $${paramCount}`
            params.push(`%${filters.search}%`)
        }

        // Sort by created_at (default: newest first)
        const sortOrder = filters.sortOrder === 'asc' ? 'ASC' : 'DESC'
        sql += ` ORDER BY created_at ${sortOrder}`

        pool.query(sql, params)
            .then(res => resolve(res.rows))
            .catch(err => reject(err))
    })

const createTask = (userId, title, deadline, priority, is_done = false) =>
    new Promise((resolve, reject) => {
        const sql = `
            INSERT INTO tasks (task_id, user_id, title, deadline, priority, is_done)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *`
        const values = [uuidv4(), userId, title, deadline, priority, is_done]
        pool.query(sql, values)
            .then(res => resolve(res))
            .catch(err => reject(err))
    })

const updateTask = (taskId, title, deadline, priority) =>
    new Promise((resolve, reject) => {
        const sql = `
            UPDATE tasks
            SET title = $1, deadline = $2, priority = $3
            WHERE task_id = $4 RETURNING title, deadline, priority
        `
        const values = [title, deadline, priority, taskId]
        pool.query(sql, values)
            .then(res => resolve(res))
            .catch(err => reject(err))
    })

const deleteTask = (taskId) =>
    new Promise((resolve, reject) => {
        const sql = `DELETE FROM tasks WHERE task_id = $1 `
        pool.query(sql, [taskId])
            .then(res => resolve(res.rows))
            .catch(err => reject(err))
    })

const getTaskById = (taskId) =>
    new Promise((resolve, reject) => {
        const sql = `SELECT task_id, title, deadline, priority, is_done FROM tasks WHERE task_id = $1`
        pool.query(sql, [taskId])
            .then(res => resolve(res.rows[0]))
            .catch(err => reject(err))
    })

const updateTaskStatus = (is_done, taskId) =>
    new Promise((resolve, reject) => {
        const sql = `
            UPDATE tasks
            SET is_done = $1,
                completed_at = CASE 
                    WHEN $1 = true THEN NOW() 
                    ELSE NULL 
                END
            WHERE task_id = $2 RETURNING *
        `
        const values = [is_done, taskId]
        pool.query(sql, values)
            .then(res => resolve(res))
            .catch(err => reject(err))
    })

module.exports = {
    getAllTasks,
    createTask,
    updateTask,
    deleteTask,
    getTaskById,
    updateTaskStatus
}