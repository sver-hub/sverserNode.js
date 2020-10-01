const {Router} = require('express')
const User = require('../models/User')
const router = Router()

module.exports = router

router.get('get/:id', [], async (req, res) => {
    try {
        const user = await User.findOne({id : req.params.id}).select('-password-email')

        if (!user) {
            res.status(400).json({message: 'No such user'})
        }

        res.status(200).json(user)

    } catch (e) {
        res.status(500).json({message: 'Something went wrong...'})
    }
})

router.post('edit/:id', [], async (req, res) => {
    try {
        const {name, surname, dateOfBirth, location, status} = req.body
        if (!name || dateOfBirth > Date.now()) {
            res.status(400).json({message: 'Invalid data input'})
        }

        const user = await User.findOne({id: req.params.id}).select('-password-email')
        user.name = name
        user.surname = surname
        user.dateOfBirth = dateOfBirth
        user.location = location
        user.status = status

        await user.save()

        res.status(200).json({message: 'User data successfully updated'})

    } catch (e) {
        res.status(500).json({message: 'Something went wrong...'})
    }
})



