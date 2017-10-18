const
    express = require('express'),
    passport = require('passport'),
    tripsRouter = new express.Router(),
    Trip = require('../models/Trip.js'),
    Activity = require('../models/Activity.js')

tripsRouter.route('/')
    .get((req, res) => {
        Trip.find({}, (err, trips) => {
            res.json(trips)
            // res.render('../views/trips/all-trips', {trips:trips })
        })
    })

tripsRouter.route('/:id')
    .get((req, res) => {
        Trip.findById(req.params.id, (err, trip) => {
            Activity.find({trip: req.params.id}, (err, activities) => {
                res.render('../views/trips/trip', {trip:trip, activities: activities})
            })
            //res.json(trip)
        })
    })
    .patch((req, res) => {
        Trip.findById(req.params.id, (err, trip) => {
            trip = Object.assign(trip, req.body)
            trip.save((err, updatedTrip) => {
                if(err) return console.log(err)
                res.redirect('/users/profile')
            })

        })
    })

    .delete((req, res) => {
        Trip.findByIdAndRemove(req.params.id, (err, deletedTrip) => {
            res.redirect('/users/profile')
        })
    })
    

    tripsRouter.route('/:id/activity')
    .get((req, res) => {
        Activity.find({}, (err, activities) => {
            res.json(activities)
            // res.render('../views/trips/all-trips', {trips:trips })
        })
    })
    .post((req, res) => {
        var newActivity = new Activity(req.body)
        newActivity.trip = req.params.id
        newActivity.user = req.user
        newActivity.save((err, activity) => {
            res.json({success: true, message: "Activity created!", activity})
        })
    })

    .patch((req, res) => {
        Activity.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedActivity) => {
            res.json(updatedActivity)
        })
    })

    .delete((req, res) => {
        Activity.findByIdAndRemove(req.params.id, (err, deletedActivity) => {
            res.json({success: true, message: `${deletedActivity.place} has been deleted.`})
        })
    })

tripsRouter.get('/:tripId/activities/:activityId', (req, res) => {
    Activity.findById(req.params.activityId, (err, activity) => {
        res.json(activity)
    })
}) 

tripsRouter.route('/:id/edit')
.get((req, res) => {
    Trip.findById(req.params.id, (err, trip) => {
        if(err) return console.log(err)
        res.render('../views/trips/edit', {trip:trip})
    })
})
    
module.exports = tripsRouter