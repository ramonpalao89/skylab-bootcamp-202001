const { validate } = require('modum-utils')
const { models: { User, Song, Playlist } } = require('modum-data')
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
                    debugger

                    if (playlist.length) {
                        const existIndex = playlist.findIndex(item => item.song.toString() === idSong)
                        if (existIndex !== -1) {
                            playlist.splice(existIndex, 1)
                            song.isFav = false
                            song.save()
                        } else {
                            const playlistSong = new Playlist({ song: idSong })

                            song.isFav = true
                            playlist.push(playlistSong)
                            song.save()
                        }
                    } else {
                        const playlistSong = new Playlist({ song: idSong })

                        song.isFav = true
                        playlist.push(playlistSong)
                        song.save()
                    }

                    user.save()
                })
                .then(() => { })
        })
}