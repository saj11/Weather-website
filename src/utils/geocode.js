const request = require('request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoic2FqMTEiLCJhIjoiY2p4Z3I1N2M2MDg0bjN0czJxeGw3d3h0aCJ9.cijtN_mNU5YqUvJGnPoVyA`
    request( {url, json: true}, (error, response) => {
        if(error){
            callback('Unable to connect to Location Services.', undefined)
        }else{
            const {features} =  response.body
            
            if(features.length === 0){
                callback(`Location: ${features.query} not found. Try another search!`, undefined)
            }else{
                callback(undefined, {
                    lat: features[0].center[0],
                    lng: features[0].center[1],
                    location: features[0].place_name })
            }
        }
    })
}

module.exports = geocode