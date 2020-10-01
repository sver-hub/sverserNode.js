const {Schema, model} = require('mongoose')

const schema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    name: {type: String},
    surname: {type: String},
    dateOfBirth: {type: Date},
    location: String,
    status: String,
    online: Boolean
})

module.exports = model('User', schema)