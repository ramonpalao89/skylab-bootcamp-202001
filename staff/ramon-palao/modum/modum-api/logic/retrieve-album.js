const { validate } = require('modum-utils')
const { models: { Album } } = require('modum-data')
const { NotFoundError, NotAllowedError } = require('modum-errors')

module.exports = idAlbum => {
    validate.string(idAlbum, 'idAlbum')

    return Album.findById(idAlbum).populate('songs', 'name').populate('artists', 'name')
        .lean()
        .then(album => {

            if (!album) throw new NotFoundError(`album with id ${idAlbum} does not exist`)


            // album.forEach(item => {
            //     item.id = item._id.toString()

            //     delete item._id
            // })

            return album
        })
}