const { validate } = require('modum-utils')
const { models: { Song } } = require('modum-data')
const { NotFoundError, NotAllowedError } = require('modum-errors')

module.exports = idArtist => {
    validate.string(idArtist, 'idArtist')

    return Song.find({artists: idArtist})
        .lean()
        .then(songs => {

            // if (!album) throw new NotFoundError(`album with id ${idAlbum} does not exist`)
            
            // album.songs.forEach(item => {
            //     item.id = item._id.toString()

            //     delete item._id
            // })

            // album.artists.forEach(item => {
            //     item.id = item._id.toString()

            //     delete item._id
            // })

            // album.id = album._id.toString()
            // delete album._id
            // delete album.__v

            return songs
        })
}