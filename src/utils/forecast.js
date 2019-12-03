const request = require('request')

const forecast = (latitude, longitude, callback) =>{
    const url = `https://api.darksky.net/forecast/a8529618bc7e437bb416167b39456ae2/${latitude},${longitude}?units=si`;
    request({url, json: true}, (error, {body}) =>{        
        if(error){
            callback('Unable to connect to the weather service.', undefined);
        } else if (body.error){
            callback('Unable to find location.', undefined);
        } else {            
            let temp = (body.currently.temperature).toFixed(0)
            let precip = body.currently.precipProbability
            let summary = body.daily.data[0].summary

            let tempMax = (body.daily.data[0].temperatureHigh).toFixed(0)
            let tempMin = (body.daily.data[0].temperatureLow).toFixed(0)
            let pressure = (body.daily.data[0].pressure).toFixed(0)
            let storm = (body.currently.nearestStormDistance)

            if(storm === undefined){
                storm = '???'
            }

            // let weatherForecast =`
            // It is currently ${temp} degrees with a ${precip}% chance to rain. The nearest storm is ${storm} km away.
            // ${summary} The temperature will range between ${tempMax}\u00B0/${tempMin}\u00B0C with atmospheric pressure of ${pressure} mbar.`

            weatherDataObject = {
                summary : summary,
                now: {temp: temp, precip : precip},
                maxmin : {tempMax: tempMax, tempMin: tempMin},
                atm: { pressure: pressure, storm: storm}
            }


            callback(undefined, weatherDataObject);
        }
    })
}

module.exports = forecast;