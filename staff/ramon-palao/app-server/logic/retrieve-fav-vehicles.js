const {call} = require('../utils')
const atob = require('atob')

module.exports = function (token, callback) {
    if (typeof token !== 'string') throw new TypeError(`${token} is not a string`)
    if (!token.trim()) throw new Error('token is empty')
    if (typeof callback !== 'function') throw new TypeError(`${callback} is not a function`)

    const tokenParts = token.split('.')
    if (tokenParts.length !== 3) throw new Error('token is invalid')
    if (typeof callback !== 'function') throw new TypeError(`${callback} is not a function`)

    const [, payload,] = tokenParts
    const payloadObject = JSON.parse(atob(payload))

    call(`https://skylabcoders.herokuapp.com/api/v2/users/${payloadObject.sub}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    }, (error, response) => {
        if (error) return callback(error)
        const content = JSON.parse(response.content)
        if (response.status !== 200) {
            callback(new Error(content.error))
        } else {
            let { favs } = content
            if (!favs) favs = []

            call(`https://skylabcoders.herokuapp.com/api/hotwheels/vehicles?q=*`, undefined, (error, response) => {
                const content = JSON.parse(response.content)
                //let vehicles = []
                let favoriteVehicles = []
                for (let i = 0; i < content.length; i++) {
                    const vehicle = content[i].id
                    // team.isFavorited = false

                    // if (favs.find(team.idTeam) === true) {
                    //     team.isFavorited = true
                    // }

                    // filtrar equips de primera divisió
                    // if (team.idLeague == 4335) {
                    //     teams.push(team)

                    if(favs.indexOf(vehicle) !== -1) favoriteVehicles.push(content[i])

                    // vehicle.isFavorited = favs.indexOf(vehicle) !== -1
                    // if (vehicle.isFavorited === true) favoriteVehicles.push(vehicle)

                    // if (favs.indexOf(team.idTeam) !== -1) {
                    //     team.isFavorited = true
                    //     favoriteTeams.push(team)
                    // } else {
                    //     team.isFavorited = false
                    // }
                }
                callback(error, {favoriteVehicles})
            })
        }
    })
}