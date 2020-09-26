const {Router} = require('express')
const User = require('../models/User')
const router = Router()

module.exports = router

router.get(':name', [], async (req, res) => {
    try {
        const user = await User.findOne({name})

        if (!user) {
            res.status(400).json({message: 'No such user'})
        }

        res.status(200).json(user)

    } catch (e) {
        res.status(500).json({message: 'Something went wrong...'})
    }
})