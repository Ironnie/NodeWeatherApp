const request = require('request')

const geoCode = (address, callback) => {
    const myurl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoicm9uaXJhamRhcyIsImEiOiJja2c2OTBybnQwaWp6MnpyMHcybmRiYWN4In0.CBdCxKoz_3EX08tbWnvr3w&limit=5'
    //console.log(myurl)
    request({url: myurl, json:true}, (error, response) => {
        
        if(error){
            callback('lOW lEVEL eRROR', undefined)
        }else if(response.body.message){
            callback('App level error', undefined)
        
        }else if(response.body.features.length === 0){
            callback('Incorrect Location', undefined)

        }else{
            
            //const long = response.body.features[0].center[0]
            //const lat = response.body.features[0].center[1]
                callback(undefined, {
                    long : response.body.features[0].center[0],
                    lat : response.body.features[0].center[1]
                })
        }
    }) 
    
     
}

//using destructuring of response OBJECT
// const geoCode = (address, callback) => {
//     const myurl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoicm9uaXJhamRhcyIsImEiOiJja2c2OTBybnQwaWp6MnpyMHcybmRiYWN4In0.CBdCxKoz_3EX08tbWnvr3w&limit=5'
//     request({url: myurl, json:true}, (error, {body}) => {
        
//         if(error){
//             callback('lOW lEVEL eRROR', undefined)
//         }else if(body.message){
//             callback('App level error', undefined)
//         }else{
//             //const long = response.body.features[0].center[0]
//             //const lat = response.body.features[0].center[1]
//             callback(undefined, {
//                 long : body.features[0].center[0],
//                 lat : body.features[0].center[1]
//             }
                
//             )
//         }
//     }) 
    
     
// }


module.exports = geoCode