const { errorHandler } = require('../utils/responses')

const authorizeRole = (role = []) => {
  return (req, res, next) => {
    try {
      const userRole = req.user.role

      if (!role.includes(userRole)) {
        return errorHandler(res, false, 403, "Akses ditolak. Anda tidak memiliki izin.")
      }

      next();
    } catch (error) {
      return errorHandler(res, false, 500, `Internal Server Error: ${error.message}`)
    }
  }
}

module.exports = { authorizeRole }