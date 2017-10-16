const
    express = require('express'),
    logger = require('morgan'),
    mongoose = require('mongoose'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoDBURL = 'mongodb://localhost/tripply',
    ejsLayouts = require('express-ejs-layouts'),
    tripsRoutes = require('./routes/trips.js')
    PORT = 3000

mongoose.connect(mongoDBURL, (err) => {
    console.log(err || 'Connected to MongoDB')
})

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(ejsLayouts)
app.use(bodyParser.urlencoded())

app.get('/', (req, res) => {
    res.json({message: "The root."})
})

app.use('/trips', tripsRoutes)

app.listen(PORT, (err) => {
    console.log(err || `Server connected on port ${PORT}`)
})