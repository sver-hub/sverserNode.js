const {Router} = require('express')
const User = require('../models/User')
const router = Router()

module.exports = router

router.get('/', [], async (req, res) => {
    const {page, pageSize} = req.query
    try {
        const users = await User.find().select('-password-email').offset(page*pageSize).limit(pageSize)

        if (!users) {
            res.status(400).json({message: 'No users found'})
        }

        res.status(200).json(users)

    } catch (e) {
        res.status(500).json({message: 'Something went wrong...'})
    }
})




