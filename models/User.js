const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    name: {type: String, required: true},
    surname: {type: String, required: true},
    dateOfBirth: {type: Date, required: true},
    location: String,
    status: String,
    online: Boolean
})

module.exports = model('User', schema)