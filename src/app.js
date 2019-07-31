const path = require('path')
const express = require('express')
const hbs = require ('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')



const app = express()

//Define path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handle bars and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req,res)=>{
    res.render('index',{
        title: 'Weather App',
        name: 'Jonas H'
    })
})

app.get('/about', (req,res)=>{
    res.render('about',{
        title: 'About',
        name: 'Jonas H',
        street: 'Bruchgasse'
    })
})

app.get('/help', (req,res)=>{
    res.render('help',{
        title: 'Help',
        help: 'Da du hilfe brauchst ruf einfach an',
        hey: 'Das passiert den besten',
        name: 'Jonas H'
    })
})


console.log(publicDirectoryPath)


app.get('/weather', (req, res) => {
    const input = req.query.address
    if(!req.query.address){
        return res.send({
            error: 'Please fill in address'
        })
        console.log(req.query.address)
    }else{
        geocode(input, (error, { latitude, longitude, location}={}) => {
            if (error) {
                return res.send({
                    error: error
                })
            }
            forecast(latitude, longitude, (error, forecastdata) => {
                if (error) {
                    return res.send({
                        error: error
                    })
                }

                res.send({

                    //forecast: 'Das'+forecastdata+'In'+location+'auf regen'+req.query.address+'heute'
                    forecast: forecastdata,
                    location: location,
                    address: req.query.address
                })
            })
        })
    }

})



/*app.get('/products', (req,res)=>{
    if (!req.query.search){
        return res.send({
            error:'Provide search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})*/


app.get('/help/*', (req,res)=>{
    res.render('404',{
        title: '404',
        message: 'Hopefully we are able to help with the correct link'
    })
})
app.get('*', (req,res) => {
    res.render('404',{
        title: '404',
        name: 'Jonas H',
        message: 'page not found'
    })
})


app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})
