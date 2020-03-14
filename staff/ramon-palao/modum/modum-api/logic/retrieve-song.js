const { validate } = require('modum-utils')
const { models: { User, Song } } = require('modum-data')
const { NotFoundError, NotAllowedError } = require('modum-errors')

module.exports = (id, idSong) => {
    
    validate.string(idSong, 'idSong')
    validate.string(id, 'id')

    return (async ()=> {
        const user = await User.findById(id)
        if (!user) throw Error
        
        const { mostPlayedSongs } = user
        let firstTimePlayed = {}

        mostPlayedSongs.forEach( song => {
            if(song.subject.toString() === idSong) {
                song.value++
            } else {
                firstTimePlayed.subject = idSong
                firstTimePlayed.value = 1
            }
        })

        mostPlayedSongs.push(firstTimePlayed)

        user.save()

        const {file} = await Song.findById(idSong)
        
        return file
    })()

}