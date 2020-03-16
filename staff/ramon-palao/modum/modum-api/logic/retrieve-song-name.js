const { validate } = require('modum-utils')
const { models: { Song, Artist } } = require('modum-data')
const { NotFoundError } = require('modum-errors')

module.exports = idSong => {
    validate.string(idSong, 'idSong')
    const artistSongName = []

    return Song.find({ _id: idSong })
        .lean()
        .then(song => {

            if (!song.length) throw new NotFoundError(`Song with id ${idSong} not found`)
            const artistId = song[0].artists
            return Artist.find({ _id: artistId })
                .lean()
                .then(artist => (artistSongName.push(artist[0])))
                .then(() => artistSongName.push(song[0]))
                .then(() => {
                    artistSongName.forEach(item => {
                        item.id = item._id.toString()

                        delete item._id
                        delete item.__v
                    })
                })
        })
        .then(() => artistSongName)
}