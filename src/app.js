const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()

//Define path for Express configuration
const publicDirectory = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup  handlerbars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//Setup static directory
app.use(express.static(publicDirectory)) 

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Joseph S'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Joseph S'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Joseph S'
    })
})

app.get('/products', (req, res) => {
    console.log(req.query)
    if(! req.query){
        return res.send({
            error: 'You must provided.'
        })
    }
    res.send({
        products: []
    })
})

app.get('/weather', (req, res) => {
    const {address} = req.query

    if(! address){
        return res.send({
            error: 'Address must be given.'
        })
    }
    
    geocode(address, (error, {lat, lng, location} = {} ) => {
        if(error){
            return res.send({ error })
        }
        
        forecast(lat, lng, (error, forecastData) => {
            if(error){
                return res.send({ error })
            }
            
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })

    
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Error 404',
        name: 'Joseph S',
        errorMessage: 'Help Article Not Found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error 404',
        name: 'Joseph S',
        errorMessage: 'Page Not Found.'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})