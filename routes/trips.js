const
    express = require('express'),
    passport = require('passport'),
    tripsRouter = new express.Router(),
    Trip = require('../models/Trip.js')

tripsRouter.route('/')
    .get((req, res) => {
        Trip.find({}, (err, trips) => {
            //res.json(trips)
            res.render('../views/home')
        })
    })

    .post((req, res) => {
        Trip.create(req.body, (err, trip) => {
            res.json({success: true, message:"trip created", trip:trip})
        })
    })


tripsRouter.route('/:id')
    .get((req, res) => {
        Trip.findById(req.params.id, (err, trip) => {
            res.json(trip)
        })
    })

    .patch((req, res) => {
        Trip.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedTrip) => {
            res.json(updatedTrip)
        })
    })

    .delete((req, res) => {
        Trip.findByIdAndRemove(req.params.id, (err, deletedTrip) => {
            res.json({success: true, message: `${deletedTrip.name} has been deleted.`})
        })
    })


module.exports = tripsRouter