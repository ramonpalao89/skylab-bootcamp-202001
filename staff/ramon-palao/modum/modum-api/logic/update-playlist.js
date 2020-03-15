const { validate } = require('modum-utils')
const { models: { User, Song } } = require('modum-data')
const { NotFoundError } = require('modum-errors')

module.exports = (idUser, idSong) => {

    validate.string(idUser, 'idUser')
    validate.string(idSong, 'idSong')

    return Song.findById(idSong)
        .then(song => {

            if (!song) throw new NotFoundError(`song with id ${idSong} does not exist`)

            return User.findById(idUser)
                .then(user => {
                    const { playlist } = user
                    playlist.push(idSong)
                    user.save()
                })
                .then(() => { })
        })
}