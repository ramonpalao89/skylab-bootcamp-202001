const Item = require('./item')

module.exports = function (props = {}) {
    const {favs: favVehicle, backUrl} = props
    return `<a href="${backUrl}">Go Back</a><ul className="results">
        ${favVehicle.map(item => Item({item}))}
    </ul>`
}