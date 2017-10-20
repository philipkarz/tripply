const
    express = require('express'),
    passport = require('passport'),
    usersRouter = new express.Router(),
    User = require('../models/User.js'),
    Trip = require('../models/Trip.js'),
    usersController = require('../controllers/users.js')


usersRouter.get('/', usersController.index)
usersRouter.get('/signup', usersController.signupShow)
usersRouter.post('/signup', usersController.signupCreate)
usersRouter.get('/login', usersController.loginShow)
usersRouter.post('/login', usersController.loginCreate)
usersRouter.get('/profile', usersController.show)
usersRouter.patch('/profile', usersController.update)
usersRouter.post('/profile', usersController.create)
usersRouter.delete('/profile', usersController.delete)
usersRouter.get('/profile/edit', usersController.edit)
usersRouter.get('/logout', usersController.logout)




function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) return next()
    res.redirect('/')
}

module.exports = usersRouter