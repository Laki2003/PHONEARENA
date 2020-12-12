const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    phone: {type: Schema.Types.ObjectId, ref: 'Phone'},
    reviewText: {type: [Object], required: true},
reviewAuthor: {type: String, required: true},
reviewYoutubeUrl: {type: String, required: true},
ratings: {type: [Number], required: true},
averageRating: {type: Number, required: true}
})

module.exports = mongoose.model('Review', reviewSchema);