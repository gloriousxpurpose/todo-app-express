const pool = require('../database/connection')
const { v4: uuidv4 } = require('uuid')

const getAllUsers = () =>
    new Promise((resolve, reject) => {
        const sql = 'SELECT user_id, fullname, email FROM users'
        pool.query(sql)
            .then(res => resolve(res.rows))
            .catch(err => reject(err))
    })

const createUser = (fullName, email, password, role = 'user', verificationToken) =>
    new Promise((resolve, reject) => {
        const sql = `
            INSERT INTO users (user_id, fullname, email, password, role, verification_token)
            VALUES ($1, $2, $3, $4, $5, $6)
        `
        const values = [uuidv4(), fullName, email, password, role, verificationToken]
        pool.query(sql, values)
            .then(res => resolve(res))
            .catch(err => reject(err))
    })

const updateUser = (userId, fullName, email, password) =>
    new Promise((resolve, reject) => {
        const sql = `
            UPDATE users
            SET fullname = $1, email = $2, password = $3
            WHERE user_id = $4
        `
        const values = [fullName, email, password, userId]
        pool.query(sql, values)
            .then(res => resolve(res))
            .catch(err => reject(err))
    })

const deleteUser = (userId) =>
    new Promise((resolve, reject) => {
        const sql = `DELETE FROM users WHERE user_id = $1`
        pool.query(sql, [userId])
            .then(res => resolve(res))
            .catch(err => reject(err))
    })

const getUserById = (userId) =>
    new Promise((resolve, reject) => {
        const sql = `SELECT user_id, fullname, email FROM users WHERE user_id = $1`
        pool.query(sql, [userId])
            .then(res => resolve(res.rows[0]))
            .catch(err => reject(err))
    })

const getUserByEmail = (email) =>
    new Promise((resolve, reject) => {
        const sql = `SELECT * FROM users WHERE email = $1`
        pool.query(sql, [email])
            .then(res => resolve(res.rows))
            .catch(err => reject(err))
    })

const getUserByVerificationToken = (token) =>
    new Promise((resolve, reject) => {
        const sql = `SELECT user_id, fullname, email FROM users WHERE verification_token = $1`
        pool.query(sql, [token])
            .then(res => resolve(res.rows))
            .catch(err => reject(err))
    })

const verifyUserEmail = (token) =>
    new Promise((resolve, reject) => {
        const sql = `
            UPDATE users
            SET is_verified = true, verification_token = NULL
            WHERE verification_token = $1
        `
        pool.query(sql, [token])
            .then(res => resolve(res))
            .catch(err => reject(err))
    })

module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
    getUserById,
    getUserByEmail,
    getUserByVerificationToken,
    verifyUserEmail
}