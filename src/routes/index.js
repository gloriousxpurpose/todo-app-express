const router = require('express').Router()

const routes = [
    require('./user.route'),
    require('./task.route'),

];

routes.forEach((route) => router.use(route))

module.exports = router