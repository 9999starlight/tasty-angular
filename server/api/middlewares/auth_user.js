const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  // check if there is token
  if (
    req.headers.authorization == null ||
    req.headers.authorization == undefined
  )
    return res.status(401).json({
      message: `Unauthorized access or invalid token!`
    }) 
  // if token, verify or send 401 if invalid/unauthorized
  const token = req.headers.authorization.split(' ')[1]
  jwt.verify(token, process.env.JWT_KEY, (error, userData) => {
    if (error) {
      return res.status(401).json({
        message: `Unauthorized access or invalid token!`
      })
    }
    req.userData = userData
    next()
  })
}
