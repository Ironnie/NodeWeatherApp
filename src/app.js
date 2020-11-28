const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')
//const forecast = require('./utils/forecast')
//console.log(__dirname)
//console.log(__filename)

const app = express();

//define paths for Express config
const publicdirpath = path.join(__dirname, '../public/')
console.log('MINE:::' + publicdirpath)
const templatepath = path.join(__dirname, '../template/views') // by default express looksup for 'views' folder, we have changed that using this variable
const partialspath = path.join(__dirname, '../template/partials') 

//Set up handlebars engine and views location
//including handlebar template engine in the app
app.set('view engine', 'hbs')
app.set('views', templatepath)

//Setup and configure Partials with handlebars
hbs.registerPartials(partialspath)

//it uses default static content to show on root url. But it will only work if the filename is index.html
app.use(express.static(publicdirpath))


app.get('', (req, res) => {
    res.render('index', {   //this param should match with the handlebar file name, no extension is needed
        title: 'WEATHER',
        name: 'RONNIE'
    }) 
})



//default page...will not use the below block if app.use(express.static) is used
// app.get('', (req, res) => {
//     res.send('Hello Express!!!!')
// })

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'ABOUT',
        name: 'RONNIE'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        topic: 'Cuisine',
        title: 'HELP',
        name: 'RONNIE'
    })
})



app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must give address to continue'
        })
    }
    
    // res.send({
    //     address: req.query.address 
    // })
    geoCode(req.query.address, (error, data) => {
        //console.log(error)
        if(error){
            res.send({error})  
        }else{
        //console.log('Error:' + error)
        // res.send({
        //     LAT: data.lat,
        //     LONG: data.long
        // })
            forecast(data.lat, data.long, (error, data) => {
                res.send({
                    'Location' : req.query.address,
                    'Forecast' : data
                })
            })
        }

    })
    //console.log(apioutput)
    //res.send(apioutput)

    // res.send({
    //     Location: 'India',
    //     Forecast: 27
    // })
})


app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })

})

app.get('/help/*', (req, res) => {
    res.render('404', {
        msg: '404: Help is not available!!!',
        name: 'RONNIE',
        title: '404',
        psth: publicdirpath
    })
})

app.get('*', (req, res) => {
    //res.send('404: Please search something else!!!')
    res.render('404', {
        msg: '404: Please search something else!!!',
        name: 'RONNIE'
    })
})

//listening on port 3000
app.listen(3000, () => {
    console.log('Web Server is running!!!')
})

