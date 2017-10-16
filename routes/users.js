const
    express = require('express'),
    passport = require('passport'),
    usersRouter = new express.Router()
    User = require('../models/User.js')


usersRouter.route('/')
    .get((req, res) => {
        User.find({}, (err, users) => {
            //res.json(trips)
            res.json(users)
        })
    })

usersRouter.route('/login')
    .get((req, res) => {
        res.render('login'), {message: req.flash('loginMessage')}
    })
    .post(passport.authenticate('local-login', {
        successRedirect: '/users/profile',
        failureRedirect: '/users/login'
    }))

usersRouter.route('/signup')
    .get((req, res) => {
        res.render('signup')
    })

    .post(passport.authenticate('local-signup', {
        successRedirect: '/users/profile',
        failureRedirect: '/users/signup'
    }))

usersRouter.route('/profile') 
    .get(isLoggedIn, (req, res) => {
        res.render('profile', {user: req.user})
        //console.log(req.user._id)
    })

    .delete(isLoggedIn, (req, res) => {
        console.log(req.user)
        User.findByIdAndRemove(req.user._id, (err, user) => {
            if (err) return console.log(err)
            req.logout()
            res.redirect('/')
        })
    })

usersRouter.route('/profile/edit')
    .get((req, res) => {
        User.findById(req.user._id, (err, user) => {
            if(err) return console.log(err)
            console.log(req.user)
            res.render('../views/users/edit', {user:user})
        })
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

    // .delete((req, res) => {
    //     User.findByIdAndRemove(req.params.id, (err, user) => {
    //         if(err) return console.log(err)
    //         res.json({
    //             success: true,
    //             message: 'User Deleted'
    //         })
    //     })
    // })
})
module.exports = usersRouter