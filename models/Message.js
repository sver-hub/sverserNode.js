const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    senderId: {type: Types.ObjectId, required: true, ref: 'User'},
    receiverId: {type: Types.ObjectId, required: true, ref: 'User'},
    date: {type: Date, default: Date.now},
    text: {type: String, required: true},
})

module.exports = model('Message', schema)