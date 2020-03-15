const { validate } = require('modum-utils')
const { models: { User, Song } } = require('modum-data')
const { NotFoundError, NotAllowedError } = require('modum-errors')

module.exports = (id, idSong) => {

    validate.string(idSong, 'idSong')
    validate.string(id, 'id')

    return (async () => {
        const user = await User.findById(id)
        if (!user) throw Error

        const { mostPlayedSongs } = user
        let firstTimePlayed = {}
        let found = false

        if (mostPlayedSongs.length){
            for (let i = 0; i < mostPlayedSongs.length; i++) {
                if (mostPlayedSongs[i].subject.toString() === idSong) {
                    mostPlayedSongs[i].value++
                    found = true
                }
            }
        } 
        if (found === false) {
            firstTimePlayed.subject = idSong
            firstTimePlayed.value = 1
            mostPlayedSongs.push(firstTimePlayed)
        }

        user.save()

        const { file } = await Song.findById(idSong)

        return file
    })()

}