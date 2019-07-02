const request = require('request')

const forecast = (lat, lng, callback) => {
    const url = `https://api.darksky.net/forecast/30fcd42f72eb8d6258baad3a885cce91/${lat},${lng}?units=si`

    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to network.', undefined)
        }else if(body.error){
            callback(body.error, undefined)
        }else{
            const root = body.daily.data[0]

            callback(undefined, 
           `${root.summary}
            \n It is currently ${body.currently.temperature} degrees out.
            \n There is a ${body.currently.precipProbability}% change of rain.
            \n Max Temperature: ${root.temperatureMax}.
            \n Min Temperature: ${root.temperatureMin}.
            \n Humidity: ${root.humidity}.
            \n Cloud Covering: ${root.cloudCover*100}%.
           `)   
        }
    })
}

module.exports = forecast