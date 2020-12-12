const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    review: {type: Schema.Types.ObjectId, ref: 'Review'},
    authorName: {type: String, required: true},
    text: {type: String, required: true},
    likes: {type: Number, required: true},
    dislikes: {type: Number, required: true}
})
module.exports = mongoose.model('Comment', commentSchema);