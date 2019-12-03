
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

//  EXPRESS INITIALIZATION
const app = express();

//heroku optimization
const port = process.env.PORT || 3000

// DEFINE PATHS FOR EXPRESS CONFIG
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// SETUP HANDLEBARS ENGINE AND VIEWS LOCATION
app.set('view engine', 'hbs');
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

// SETUP STATIC DIRECTORY TO SERVE
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Miguel'
    });
})

app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'About',
        name: 'Miguel'
    })
})


app.get('/help', (req, res) =>{
    res.render('help', {
        title: 'Help',
        message: 'How can I help you?',
        name: 'Miguel'
    })
})


// END-POINT
app.get('/weather', (req, res) => {

    if (!req.query.address){
        return res.send({
         error:   'You must provide an address.'}
       )
    }
    // use default parameter = empty object to avoid 'cannot destructure property' error
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error})
        }
        forecast(latitude,longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error})
            }
            res.send({
                location: location,
                forecast: forecastData.summary,
                now: forecastData.now,
                maxmin: forecastData.maxmin,
                atm : forecastData.atm,
                address: req.query.address
            })
        })
    })
})

// THE QUERY STRING TECHNIQUE
app.get('/products', (req,res) => {

    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        })
    }

    console.log(req.query)
    res.send({
        products: []
    })
})


// 404 Pages
// specific pattern
app.get('/help/*', (req, res) =>{
    res.render('404', {
        message: 'Help article not found',
        title: '404',
        name: 'Miguel'
    })
})

// global
app.get('*', (req, res) =>{
    res.render('404', {
        message: 'Page not found',
        title: '404',
        name: 'Miguel'
    })
})


// start up the server - port 3000 = developer's port
app.listen(port, () =>{
    console.log(`The server is up on port ${port}`)
})

// in the browser use : http://localhost:3000/