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
                const song = await Song.findById(playlist[i]).lean()
                song.id = song._id.toString()
                delete song._id
                delete song.__v
                
                const album = await Album.find({songs: playlist[i]}).populate('artists', 'name').lean()
                
                album[0].artists[0].id = album[0].artists[0]._id.toString()
                delete album[0].artists[0]._id
            
                playlistSongs.push(song, album[0].name, album[0].artists)
            }

        } else {
            throw new NotFoundError('No songs in playlist')
        }

        return playlistSongs
    })()
}