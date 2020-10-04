const {Router} = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const User = require('../models/User')
const {registerValidation, loginValidation} = require("../validation/auth.validation");

const router = Router()

module.exports = router


// /api/auth/register
router.post('/register', async (req, res) => {
        try {

            const {error} = registerValidation(req.body)
            if (error) {
                return res.status(400).json({message: error.details[0].message})
            }

            const {email, password} = req.body

            const candidate = await User.findOne({email}).select('email')

            if (candidate) {
                return res.status(400).json({message: 'User with this email already exists'})
            }

            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)
            const user = new User({email, password: hashedPassword})

            await user.save();

            res.status(201).json({message: 'User has been created'})


        } catch (e) {
            console.log(e.message)
            res.status(500).json({message: 'Something went wrong, try again...'})
        }
    })

// /api/auth/login
router.post('/login', async (req, res) => {
        try {
            const {error} = loginValidation(req.body)
            if (error) {
                return res.status(400).json({message: error.details[0].message})
            }

            const {email, password} = req.body

            const user = await User.findOne({email}).select(['email', 'password'])

            if (!user) {
                return res.status(400).json({message: 'User with this email is not registered'})
            }

            const isPasswordMatch = await bcrypt.compare(password, user.password)

            if (!isPasswordMatch) {
                return res.status(400).json({message: 'Wrong password'})
            }

            const token = jwt.sign(
                {id: user.id},
                config.get('jwtSecret'),
                {expiresIn: '1h'}
            )

            res.json({token})

        } catch (e) {
            console.log(e.message)
            res.status(500).json({message: 'Something went wrong, try again...'})
        }
    })
