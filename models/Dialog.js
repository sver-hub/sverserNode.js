const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    userIds: {type: [Types.ObjectId], required: true, ref: 'User'},
    messagesIds: {type: [Types.ObjectId], ref: 'Message'},
})

module.exports = model('Dialog', schema)