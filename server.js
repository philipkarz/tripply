const
    express = require('express'),
    logger = require('morgan'),
    mongoose = require('mongoose'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoDBURL = 'mongodb://localhost/tripply',
    PORT = 3000

mongoose.connect(mongoDBURL, (err) => {
    console.log(err || 'Connected to MongoDB')
})

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())

app.listen(PORT, (err) => {
    console.log(err || `Server connected on port ${PORT}`)
})