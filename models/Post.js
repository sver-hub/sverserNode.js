const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    userId: {type: Types.ObjectId, required: true, ref: 'User'},
    authorId: {type: Types.ObjectId, required: true, ref: 'User'},
    date: {type: Date, default: Date.now},
    content: {type: String, required: true},
    likes: {Number},
    comments: {type: [Types.ObjectId], ref: 'Comments'},
    shares: {Number}
})

module.exports = model('Post', schema)