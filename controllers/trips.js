const
    Trip = require('../models/Trip.js'),
    Activity = require('../models/Activity.js')


module.exports = {
    index: (req, res) => {
        Trip.find({}, (err, trips) => {
            // res.json(trips)
            res.render('../views/trips/all-trips', {trips:trips })
        })
    },

    show: (req, res) => {
        Trip.findById(req.params.id, (err, trip) => {
            //res.json(trip)
            Activity.find({trip: req.params.id}, (err, activities) => {
                var sortedActivities = activities.sort(function(a, b) {
                    return new Date(a.date).getTime() - new Date(b.date).getTime() 
                })
                res.render('../views/trips/trip', {trip:trip, activities: sortedActivities})
            })
        })
    },

    edit: (req, res) => {
        Trip.findById(req.params.id, (err, trip) => {
            if(err) return console.log(err)
            res.render('../views/trips/edit', {trip:trip})
        })
    },

    update: (req, res) => {
        Trip.findById(req.params.id, (err, trip) => {
            trip = Object.assign(trip, req.body)
            trip.save((err, updatedTrip) => {
                if(err) return console.log(err)
                res.redirect('/users/profile')
            })
        })
    },

    delete: (req, res) => {
        Trip.findByIdAndRemove(req.params.id, (err, deletedTrip) => {
            res.redirect('/users/profile')
        })
    },

    showActivity: (req, res) => {
        Activity.findById(req.params.activityId, (err, activity) => {
            res.json(activity)
        })
    },

    createActivity: (req, res) => {
        var newActivity = new Activity(req.body)
        newActivity.trip = req.params.id
        newActivity.user = req.user
        newActivity.save((err, activity) => {
            console.log(req.params.id)
            res.redirect(`/trips/${req.params.id}`)
            //res.json({success: true, message: "Activity created!", activity})
        })
    },

    updateActivity: (req, res) => {
        console.log(req.body)
        Activity.findByIdAndUpdate(req.params.activityId, req.body, {'new': true}, (err, updatedActivity) => {
            // updatedActivity = req.body
            if (err) console.log(err)
            // res.redirect(`/trips/${req.params.tripId}`, {activity: updatedActivity})
            // res.json({success: true, message: 'activity updated', activity: updatedActivity})
            res.json(updatedActivity)
        })
    },

    deleteActivity: (req, res) => {
        Activity.findByIdAndRemove(req.params.activityId, (err, deletedActivity) => {
            res.json({success: true, message: `${deletedActivity.place} has been deleted.`})
        })
    },

    // 1. look up the trip by id
    // 2. hit the weather api for 10 day forecast,
    // using trip's locale as the term
    // 3. when you get data back from api,
    // render a forecast view and show the 10 day forecast results
    forecast: (req, res) => {
        Trip.findById(req.params.id, (err, trip) => {
            let locale = trip.locale
            let url = `http://api.openweathermap.org/data/2.5/weather?q=${locale}&units=imperial&appid=${apiKey}`
            
            request(url, function (err, response, body) {
                if(err){
                    res.render('weather', {weather: null, error: 'Error, please try again'})
                } else {
                    let weather = JSON.parse(body)
                //   if(weather.main == undefined){
                //     res.render('weather', {weather: null, error: 'Error, please try again'})
                //   } else {
                //     let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`
                //     res.render('weather', {weather: weatherText, error: null})
                //   }
                }
            })
        })
        
    }
}


