const 
mongoose = require('mongoose')
tripSchema = new mongoose.Schema({
    name: {type: String, required: true},
    length: {type: Number, required: true},
    locale: {type: String, required: true},
    rating: {type: Number, required: true},
    photo: String,
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
 }, {timestamps: true})

module.exports = mongoose.model('Trip', tripSchema)