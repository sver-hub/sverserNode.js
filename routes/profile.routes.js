const {Router} = require('express')
const User = require('../models/User')
const router = Router()
const verifyToken = require('../middleware/verifyToken')

module.exports = router

router.get('/', verifyToken, async (req, res) => {
    try {
        const userData = await User.findOne({_id: req.user.id}).select(['-password', '-email'])

        if (!userData) {
            return res.status(400).json({message: 'No such user'})
        }

        res.json(userData)

    } catch (e) {
        res.status(500).json({message: 'Something went wrong...'})
    }
})

router.get('/:id', [], async (req, res) => {
    try {
        const userData = await User.findOne({_id: req.params.id}).select(['-email', '-password'])

        if (!userData) {
            return res.status(400).json({message: 'No such user'})
        }

        res.json(userData)

    } catch (e) {
        res.status(500).json({message: 'Something went wrong...'})
    }
})

router.put('/', verifyToken, async (req, res) => {
    try {
        const {name, surname, dateOfBirth, location, status, imgUrl} = req.body
        if (!name || dateOfBirth > Date.now()) {
            res.status(400).json({message: 'Invalid data input'})
        }

        let user = await User.findOne({id: req.user.id}).select(['-password' , '-email'])
        user = {...user, name, surname, dateOfBirth, location, status}
        // user.name = name
        // user.surname = surname
        // user.dateOfBirth = dateOfBirth
        // user.location = location
        // user.status = status

        await user.save()

        res.status(200).json({message: 'User data successfully updated'})

    } catch (e) {
        res.status(500).json({message: 'Something went wrong...'})
    }
})



