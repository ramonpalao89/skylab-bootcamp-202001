const { validate } = require('modum-utils')
const { models: { Album } } = require('modum-data')
const { NotFoundError } = require('modum-errors')

module.exports = genreName => {
    validate.string(genreName, 'genreName')

    return Album.find({genre: genreName}).populate('artists', 'name')
        .lean()
        .then(album => {

            if (!album.length) throw new NotFoundError(`no albums found with genre ${genreName}`)

            album.forEach(item => {
                item.id = item._id.toString()

                delete item._id
                delete item.__v
            })

            // album.artists.forEach(item => {
            //     item.id = item._id.toString()

            //     delete item._id
            // })

            return album
        })
}