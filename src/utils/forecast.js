const request = require('request')

const forecast = (lat, lng, callback) => {
    const url = `https://api.darksky.net/forecast/30fcd42f72eb8d6258baad3a885cce91/${lat},${lng}?units=si`

    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to network.', undefined)
        }else if(body.error){
            callback(body.error, undefined)
        }else{
            callback(undefined, body.daily.data[0].summary + ` It is currently ${body.currently.temperature} degrees out. There is a ${body.currently.precipProbability}% change of rain.`)   
        }
    })
}

module.exports = forecast