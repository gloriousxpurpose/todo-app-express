const express = require('express')
const cors = require('cors')
const app = express()

const routes = require('./routes')
const config = require('./config')

app.enable('trust proxy')

app.use(cors({
    origin: true,
    credentials: true,
    methods: ["GET","POST","PUT","PATCH", "DELETE","OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', routes)

app.listen(config.port, () => {
    console.log(`Server starting on http://localhost:${config.port}`)
})