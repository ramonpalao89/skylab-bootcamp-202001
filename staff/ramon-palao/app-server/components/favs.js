const Item = require('./item')

module.exports = function (props = {}) {
    const {favs: {favoriteVehicles}} = props
    return `<ul className="results">
        ${favoriteVehicles.map(item => Item({item}))}
    </ul>`
}