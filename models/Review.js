const 
mongoose = require('mongoose')
reviewSchema = new mongoose.Schema({
body: String,
title: String, 
user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
trip: {type: mongoose.Schema.Types.ObjectId, ref: 'Trip'},

})

module.exports = mongoose.model('Review', reviewSchema)