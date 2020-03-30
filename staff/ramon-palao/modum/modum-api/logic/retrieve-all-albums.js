const { validate } = require('modum-utils')
const { models: { Album } } = require('modum-data')
const { NotFoundError, NotAllowedError } = require('modum-errors')

module.exports = () => {

    return Album.find().populate('artists', 'name')
        .lean()
        .then(albums => {

            // albums.artists.forEach(item => {
            //     item.id = item._id.toString()

            //     delete item._id
            // })

            // albums.id = albums._id.toString()
            // delete albums._id
            // delete albums.__v

            return albums
        })
}