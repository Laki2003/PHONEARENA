const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const replySchema = new Schema({
    comment: {type: Schema.Types.ObjectId, ref: 'Comment'},
    authorName: {type: String, required: true},
    text: {type: String, required: true},
    likes: {type: Number, required: true},
    dislikes: {type: Number, required: true}
})

module.exports = mongoose.model('Reply', replySchema);