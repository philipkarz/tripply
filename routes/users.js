const
    express = require('express'),
    passport = require('passport'),
    usersRouter = new express.Router()
    User = require('../models/User.js')


usersRouter.route('/login')
    .get((req, res) => {
        res.render('login')
        //, {message: req.flash('loginMessage')}
    })
    .post(passport.authenticate('local-login', {
        successRedirect: '/users/profile',
        failureRedirect: '/login'
    }))

usersRouter.route('/signup')
    .get((req, res) => {
        res.render('signup')
    })
    .post(passport.authenticate('local-signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup'
    }))

usersRouter.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile', {user: req.user})
})

usersRouter.get('/logout', (req, res) => {
    // destroy the session, redirect back home
    req.logout()
    res.redirect('/')
})

function isLoggedIn(req, res, next) {
if(req.isAuthenticated()) return next()
res.redirect('/')
}

usersRouter.route('/:id')
    .patch((req, res) => {
        User.findById(req.params.id, (err, user) => {
            if(err) return console.log(err)
            user = Object.assign(user, req.body)
            user.save((err, updatedUser) => {
                if(err) return console.log(err)
                res.json({
                    success: true,
                    message: 'User Updated',
                    user: updatedUser 
             })
        })

    })

    .delete((req, res) => {
        User.findByIdAndRemove(req.params.id, (err, user) => {
            if(err) return console.log(err)
            res.json({
                success: true,
                message: 'User Deleted'
            })
        })
    })
})
module.exports = usersRouter