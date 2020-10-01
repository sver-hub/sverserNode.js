const {Router} = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const router = Router()

module.exports = router


// /api/auth/register
router.post('/register',
    [
        check('email', 'Invalid email').isEmail(),
        check('password', 'Password is too short, at least 6 symbols').isLength({min: 6})
    ],
    async (req, res) => {
        try {
            const validationErrors = validationResult(req)

            if (!validationErrors.isEmpty()) {
                return res.status(400).json({
                    errors: validationErrors.array(),
                    message: 'Invalid registration data'
                })
            }

            const {email, password} = req.body

            const candidate = await User.findOne({email}).select('email')

            if (candidate) {
                return res.status(400).json({message: 'User with this email already exists'})
            }

            const hashedPassword = await bcrypt.hash(password, 12)
            const user = new User({email, password: hashedPassword})

            await user.save();

            res.status(201).json({message: 'User has been created'})


        } catch (e) {
            console.log(e.message)
            res.status(500).json({message: 'Something went wrong, try again...'})
        }
    })

// /api/auth/login
router.post('/login', [
        check('email', 'Invalid email').normalizeEmail().isEmail(),
        check('password', 'Enter a password').exists()
    ],
    async (req, res) => {
        try {
            const validationErrors = validationResult(req)
            if (!validationErrors.isEmpty()) {
                return res.status(400).json({
                    errors: validationErrors.array(),
                    message: 'Invalid login data'
                })
            }

            const {email, password} = req.body

            const user = await User.findOne({email}).select(['email','password'])

            if (!user) {
                return res.status(400).json({message: 'Such user does not exist'})
            }

            const isPasswordMatch = await bcrypt.compare(password, user.password)

            if (!isPasswordMatch) {
                return res.status(400).json({message: 'Wrong password'})
            }

            const token = jwt.sign(
                {userId: user.id},
                config.get('jwtSecret'),
                {expiresIn: '1h'}
            )

            res.json({token, userId: user.id})

        } catch (e) {
            console.log(e.message)
            res.status(500).json({message: 'Something went wrong, try again...'})
        }
    })
