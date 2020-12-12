const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const phoneSchema = new Schema({
    model: {type: String, required:true},
    brand: {type: String, required:true},
    phoneImage: {type: String, required: true},
    price: {type: Number, required: true},
    launch: {type: Object, required: true},
   body: {type: Object, required: true},
   platform: {type: Object, required: true},
    memory: {type: Object, required: true},
   camera: {type: Object, required: true}
});

module.exports = mongoose.model('Phone', phoneSchema)