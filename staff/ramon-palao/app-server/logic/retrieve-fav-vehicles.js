const {fetch} = require('events-utils')
const atob = require('atob')

module.exports = function (token) {
    if (typeof token !== 'string') throw new TypeError(`${token} is not a string`)
    if (!token.trim()) throw new Error('token is empty')

    return fetch(`https://skylabcoders.herokuapp.com/api/v2/users/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    }).then(response => {
        const content = JSON.parse(response.content)
        if (response.status !== 200) {
            throw new Error(content.error)
        } else {
            let { favs } = content
            if (!favs) favs = []
            return favs
        }})
        .then(favs => favs.map(item => fetch('https://skylabcoders.herokuapp.com/api/hotwheels/vehicles/' + item)))
        .then(calls => Promise.all(calls))
        .then(results => results.map(result => {
            const favVehicle = JSON.parse(result.content)
            favVehicle.isFav = true
            favVehicle.thumbnail = favVehicle.image
            return favVehicle
        } ))
}