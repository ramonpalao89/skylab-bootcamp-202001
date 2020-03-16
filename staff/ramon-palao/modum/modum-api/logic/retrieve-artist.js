const { validate } = require('modum-utils')
const { models: { Album } } = require('modum-data')
const { NotFoundError } = require('modum-errors')

module.exports = idArtist => {
    validate.string(idArtist, 'idArtist')

    return Album.find({artists: idArtist}).populate('artists', 'name')
        .lean()
        .then(album => {

            if (!album.length) throw new NotFoundError(`Artist with id ${idArtist} not found`)

            album[0].artists.forEach(item => {
                item.id = item._id.toString()

                delete item._id
            })

            return album[0]
        })
        .then(({artists, portrait}) => ({artists, portrait}))
}