const request = require('request')
// const lat = 37.8267
// const long = -122.4233
const forecast = (lat, long, callback) => {
    const myurl = 'http://api.weatherstack.com/current?access_key=eb8235e066f8fb4e30c54ca505a41664&query=' + lat + ',' + long + '&units=f'
    //console.log(myurl)
    request({url: myurl, json: true}, (error, response) => {
        if(error){
            callback('Low level Error', undefined)
        }else if(response.body.message){
            callback('App level error', undefined)
        }else{
            
            //console.log(response.body)
            const output = JSON.stringify(response.body.current.temperature)
            console.log(output)
            //return output
            callback(undefined, output)
            //console.log(output)    
        }
    })
}

// forecast(75.30, -124.60, (error, data) => {
//     console.log('Error:' + error)
//     console.log('DATA: ' + JSON.stringify(data))
// })
module.exports = forecast
