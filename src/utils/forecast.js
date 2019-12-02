const request = require('request')

const forecast = (latitude, longitude, callback) =>{
    const url = `https://api.darksky.net/forecast/a8529618bc7e437bb416167b39456ae2/${latitude},${longitude}?units=si`;
    request({url, json: true}, (error, {body}) =>{        
        if(error){
            callback('Unable to connect to the weather service.', undefined);
        } else if (body.error){
            callback('Unable to find location.', undefined);
        } else {            
            let temp = body.currently.temperature
            let precip = body.currently.precipProbability
            let summary = body.daily.data[0].summary
            callback(undefined, `${summary} It is currently ${temp} degrees. There is a ${precip}% chance to rain.`);
        }
    })
}

module.exports = forecast;