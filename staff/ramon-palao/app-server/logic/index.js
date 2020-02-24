module.exports = {
    authenticate: require('./authenticate-user'),
    retrieveUser: require('./retrieve-user'),
    register: require('./register-user'),
    searchVehicles: require('./search-vehicles'),
    retrieveVehicle: require('./retrieve-vehicle'),
    toogleFavVehicle: require('./toggle-fav-vehicle'),
    retrieveFavVehicles: require('./retrieve-fav-vehicles')
}