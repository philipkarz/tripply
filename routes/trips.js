const
    express = require('express'),
    passport = require('passport'),
    tripsRouter = new express.Router(),
    Trip = require('../models/Trip.js')

tripsRouter.route('/')
    .get((req, res) => {
        Trip.find({}, (err, trips) => {
            //res.json(trips)
            res.render('../views/trips/all-trips', {trips:trips })
        })
    })

tripsRouter.route('/:id')
    .get((req, res) => {
        Trip.findById(req.params.id, (err, trip) => {
            res.json(trip)
            res.render('../views/trips/trip')
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