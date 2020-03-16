const { validate } = require('modum-utils')
const { models: { Album, User, Song } } = require('modum-data')
const { NotFoundError } = require('modum-errors')

module.exports = id => {
    validate.string(id, 'id')

    return (async () => {
        const user = await User.findById(id)
        if (!user) throw new NotFoundError(`User with id ${id} not found`)

        const { playlist } = user
        const playlistSongs = []

        if(playlist.length){
            for(let i = 0; i < playlist.length; i++){
                const song = await Song.findById(playlist[i])
                const album = await Album.find({songs: playlist[i]}).populate('artists', 'name')
            
                playlistSongs.push(song, album[0].name, album[0].artists)
            }

        } else {
            throw new NotFoundError('No songs in playlist')
        }

        return playlistSongs
    })()
}