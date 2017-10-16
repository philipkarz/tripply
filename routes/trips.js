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

    })
.tripsRouter.route('/:id')
    .get((req, res) => {

    })
    .patch((req, res) => {

    })
    .delete((req, res) => {

    })


module.exports = tripsRouter