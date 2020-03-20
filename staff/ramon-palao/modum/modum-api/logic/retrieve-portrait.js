const { validate } = require('modum-utils')
const { models: { Album } } = require('modum-data')
const { NotFoundError } = require('modum-errors')

module.exports = idAlbum => {
    validate.string(idAlbum, 'idAlbum')

    return Album.findById(idAlbum)
        .lean()
        .then(album => {

            if (!album) throw new NotFoundError(`album with id ${idAlbum} does not exist`)

            const { portrait } = album

            return portrait
        })
}