const 
mongoose = require('mongoose')
tripSchema = new mongoose.Schema({
    name: String,
    length: Number,
    locale: String,
    photo: String,
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    // activity: {type: mongoose.Schema.Types.ObjectId, ref: 'Activity'}
})

module.exports = mongoose.model('Trip', tripSchema)