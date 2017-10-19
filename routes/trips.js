const
    express = require('express'),
    passport = require('passport'),
    tripsRouter = new express.Router(),
    Trip = require('../models/Trip.js'),
    Activity = require('../models/Activity.js')

tripsRouter.route('/')
    .get((req, res) => {
        Trip.find({}, (err, trips) => {
            // res.json(trips)
            res.render('../views/trips/all-trips', {trips:trips })
        })
    })

    tripsRouter.route('/:id')
    .get((req, res) => {
        Trip.findById(req.params.id, (err, trip) => {
            //res.json(trip)
            Activity.find({trip: req.params.id}, (err, activities) => {
                var sortedActivities = activities.sort(function(a, b) {
                    return new Date(a.date).getTime() - new Date(b.date).getTime() 
                })
                res.render('../views/trips/trip', {trip:trip, activities: sortedActivities})
            })
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
        Trip.findById(req.params.id, (err, trip) => {
            //res.json(trip)
            res.render('../views/trips/trip', {trip:trip})
        })
    })
    .post((req, res) => {
        var newActivity = new Activity(req.body)
        newActivity.trip = req.params.id
        newActivity.user = req.user
        newActivity.save((err, activity) => {
            console.log(req.params.id)
            res.redirect(`/trips/${req.params.id}`)
            //res.json({success: true, message: "Activity created!", activity})
        })
    })

tripsRouter.route('/:id/edit')
    .get((req, res) => {
        Trip.findById(req.params.id, (err, trip) => {
            if(err) return console.log(err)
            res.render('../views/trips/edit', {trip:trip})
        })
    })

tripsRouter.route('/:tripId/activities/:activityId')
    .get((req, res) => {
        Activity.findById(req.params.activityId, (err, activity) => {
            res.json(activity)
        })
    })
    .patch((req, res) => {
        console.log(req.body)
        Activity.findByIdAndUpdate(req.params.activityId, req.body, {'new': true}, (err, updatedActivity) => {
            // updatedActivity = req.body
            if (err) console.log(err)
            // res.redirect(`/trips/${req.params.tripId}`, {activity: updatedActivity})
            // res.json({success: true, message: 'activity updated', activity: updatedActivity})
            res.json(updatedActivity)
        })
    })
    .delete((req, res) => {
        Activity.findByIdAndRemove(req.params.activityId, (err, deletedActivity) => {
            res.json({success: true, message: `${deletedActivity.place} has been deleted.`})
        })
    })
    
module.exports = tripsRouter