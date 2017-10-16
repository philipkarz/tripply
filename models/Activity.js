const 
mongoose = require('mongoose')
activitySchema = new mongoose.Schema({
    address: String,
    rating: Number,
    trip: {type: mongoose.Schema.Types.ObjectId, ref: 'Trip'},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
})

module.exports = mongoose.model('Activity', activitySchema)