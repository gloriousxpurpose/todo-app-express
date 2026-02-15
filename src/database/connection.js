const config = require('../config')
const pg = require('pg')
const { Pool } = pg

const pool = new Pool({
    host : config.db.host,
    port : config.db.port,
    database : config.db.database,
    user : config.db.user,
    password : config.db.password,
})

pool.connect()
.then(() => console.log("Connected to database"))
.catch(err => console.error("Connection failed", err))


module.exports = pool