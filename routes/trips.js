const
    express = require('express'),
    passport = require('passport'),
    tripsRouter = new express.Router(),
    Trip = require('../models/Trip.js')

tripsRouter.route('/')
    .get((req, res) => {
        Trip.find({}, (err, trips) => {
            res.json(trips)
        })
    })
    .post((req, res) => {
        Trip.create(req.body, (err, trip) => {
            res.json({success: true, message:"trip created", trip:trip})
        })
    })



module.exports = tripsRouter