require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { mongoose, models: { User, Song, Playlist, Album } } = require('modum-data')
const { NotFoundError } = require('modum-errors')
const { expect } = require('chai')
const { random } = Math
const retrievePlaylist = require('./retrieve-playlist')

describe('retrievePlaylist', () => {
    before(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => Promise.all([User.deleteMany(), Song.deleteMany(), Playlist.deleteMany(), Album.deleteMany()]))
    )

    let name, surname, email, password, artists, file, genre, year, priceDigital, priceVinyl, buyers, portrait, songs, format

    beforeEach(() => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        password = `password-${random()}`
        artists = `artist-${random()}`
        file = `file-${random()}`
        genre = `genre-${random()}`
        year = `year-${random()}`
        priceDigital = random()
        priceVinyl = random()
        buyers = random()
        portrait = `portrait-${random()}`
        songs = []
        format
    })

    describe('when user already exists', () => {
        let _id, idUser, idSong, albumObject

        beforeEach(() =>
            User.create({ name, surname, email, password })
                .then(user => {

                    idUser = user.id

                    const { playlist } = user

                    let songObject = new Song({ name, artists, file })
                    let { _id } = songObject
                    idSong = _id.toString()

                    const playList = new Playlist({ song: idSong })

                    playlist.push(playList)

                    user.save()

                    albumObject = new Album({ name, genre, year, priceDigital, priceVinyl, buyers, portrait, songs: idSong, artists: idSong })
                    
                    Album.create(albumObject)

                    return Song.create(songObject)
                })
                .then(({ id }) => {
                    _id = id
                })
        )

        it('should succeed returning an array of objects', () =>
            retrievePlaylist(idUser)
                .then(playlistSongs => {
                    expect(playlistSongs).to.exist
                    expect(playlistSongs).to.be.instanceOf(Object)
                    expect(playlistSongs.length).to.be.greaterThan(0)
                    expect(playlistSongs.length).not.to.be.greaterThan(1)
                    expect(playlistSongs[0].song.id).to.equal(idSong)
                    expect(playlistSongs[0].song.isFav).to.equal(false)
                    expect(playlistSongs[0].name).to.equal(albumObject.name)                    
                })
        )

        it('should fail on incorrect user id', () =>
            retrievePlaylist(`${idUser}--`)
                .then(() => { throw new Error('should not reach this point') })
                .catch(error => {
                    expect(error).to.be.an.instanceOf(Error)
                    expect(error).not.to.be.undefined
                })
        )
    })

    after(() => Promise.all([User.deleteMany(), Song.deleteMany(), Playlist.deleteMany(), Album.deleteMany()]).then(() => mongoose.disconnect()))
})