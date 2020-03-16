const { validate } = require('modum-utils')
const { models: { User, Song } } = require('modum-data')
const { NotFoundError, NotAllowedError } = require('modum-errors')

module.exports = (id, idSong) => {

    validate.string(idSong, 'idSong')
    validate.string(id, 'id')

    return (async () => {
        const user = await User.findById(id)
        if (!user) throw Error

        const { mostPlayedSongs, mostPlayedArtists } = user

        const { file, artists } = await Song.findById(idSong)
        
        let firstTimeArtistPlayed = {}
        let firstTimePlayed = {}
        let foundArtist = false
        let foundSong = false

        if (mostPlayedSongs.length){
            for (let i = 0; i < mostPlayedSongs.length; i++) {
                if (mostPlayedSongs[i].subject.toString() === idSong) {
                    mostPlayedSongs[i].value++
                    foundSong = true
                }
            }
        } 
        if (foundSong === false) {
            firstTimePlayed.subject = idSong
            firstTimePlayed.value = 1
            mostPlayedSongs.push(firstTimePlayed)
        }

        if (mostPlayedArtists.length){
            for (let i = 0; i < mostPlayedArtists.length; i++) {
                if (mostPlayedArtists[i].subject.toString() === artists) {
                    mostPlayedArtists[i].value++
                    foundArtist = true
                }
            }
        } 
        if (foundArtist === false) {
            firstTimeArtistPlayed.subject = artists
            firstTimeArtistPlayed.value = 1
            mostPlayedArtists.push(firstTimeArtistPlayed)
        }

        user.save()
        
        return file
    })()

}