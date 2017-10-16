const
    express = require('express'),
    passport = require('passport'),
    usersRouter = new express.Router()

usersRouter.route('/signup')
    .get((req, res) => {

    })
    .post((req, res) => {

    })

usersRouter.route('/login')
    .get((req, res) => {

    })
    .post((req, res) => {

    })

usersRouter.route('/profile')
    .get((req, res) => {

    })

usersRouter.route('/logout')
    .get((req, res) => {

    })

module.exports = usersRouter