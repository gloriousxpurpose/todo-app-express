const successHandler = (res, success = true, statusCode, message, data = null) => {
    return res.status(statusCode).json({
        success,
        statusCode,
        message,
        data
    })
}

const errorHandler = (res, success = false, statusCode, message) => {
    return res.status(statusCode).json({
        success,
        statusCode,
        message
    })
}

module.exports = {
    successHandler, errorHandler
}