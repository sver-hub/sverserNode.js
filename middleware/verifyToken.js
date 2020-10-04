const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = function (req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) return res.status(401).send('Unauthorized')

    try {
        req.user = jwt.verify(token, config.get('jwtSecret'))
        next()
    } catch (er) {
        res.status(400).send('Invalid token')
    }

}