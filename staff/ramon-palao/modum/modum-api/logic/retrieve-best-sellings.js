const { validate } = require('modum-utils')
const { models: { Album } } = require('modum-data')
const { NotFoundError } = require('modum-errors')

module.exports = () => {

    return Album.find().sort({buyers: -1}).limit(5).populate('artists', 'name')
        .lean()
        .then(album => {

            album.forEach(item => {
                item.id = item._id.toString()

                delete item._id
                delete item.__v
            })

            return album
        })
}