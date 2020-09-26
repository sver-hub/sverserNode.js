const express = require('express')
const mongoose = require('mongoose')
const config = require('config')

const PORT = config.get('port') || 2990

const app = express()
app.use(express.json({}))
app.use('/api/profile', require('./routes/profile.routes'))
app.use('/api/auth', require('./routes/auth.routes'))

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
            useCreateIndex: true,
        })
        app.listen(PORT, () => {
            console.log(`Server has been started on ${PORT}...`)
        })
    }
    catch (e) {
        console.log(e)
    }
}

start()

