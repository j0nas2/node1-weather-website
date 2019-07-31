const request = require ('request')

const forecast= (lat,long,callback) => {
    const url = 'https://api.darksky.net/forecast/dcfaa2c0012ead417ea8098fb1f5ebf3/'+lat+','+long+'?units=si'

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('not connected', undefined)
        } else if (body.error) {
            callback('unable to find location', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary+' Current temperature: '+body.currently.temperature+'°c + ' + 'rain: '+body.currently.precipProbability+ '% chance')
        }
    })
}

module.exports = forecast
