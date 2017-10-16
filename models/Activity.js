const 
mongoose = require('mongoose')
activitySchema = new mongoose.Schema({
    address: {type: String, required: true},
    rating: Number,
    trip: {type: mongoose.Schema.Types.ObjectId, ref: 'Trip'},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
}, {timestamps: true})

module.exports = mongoose.model('Activity', activitySchema)