require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { mongoose, models: { User, Album, Song, Playlist } } = require('modum-data')
const { NotFoundError } = require('modum-errors')
const { expect } = require('chai')
const { random } = Math
const updatePlaylist = require('./update-playlist')

describe('updatePlaylist', () => {
    
    before(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => Promise.all([User.deleteMany(), Album.deleteMany(), Playlist.deleteMany()]))
    )

    let name, surname, email, password, artists, file, genre, year, priceDigital, priceVinyl, buyers, portrait, songs, format, idUser, idSong

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
        


        beforeEach(() =>

            User.create({ name, surname, email, password })

                .then(user => {

                    idUser = user.id

                    const { playlist } = user

                    return Song.create({ name, artists, file, isfav: true })

                        .then((_song) => {
                           

                            idSong = _song.id
                            return new Playlist({ song: idSong })

                        })
                        .then((list) => {
                           

                            playlist.push(list)
                            user.save()
                        })


                })

        )

        it('should succeed updating playlist', () => {debugger

            // User.create({ name, surname, email, password })
            //     .then(user => { idUser = user.id })

            updatePlaylist(idUser, idSong)
                .then(result => {
                    expect(result).to.not.exist
                    expect(result).to.be.undefined

                    return User.findById(idUser)
                })
                .then(user => {
                    const { playlist } = user
                    expect(playlist).to.exist
                    expect(playlist).to.be.an.instanceOf(Object)
                    expect(playlist.length).to.equal(1)
                    expect((playlist[0].id)).to.exist

                })
        })

        it('should fail on incorrect song id', () => {
           

            const wrongIdSong = `8756uyj7iuku`

            updatePlaylist(idUser, wrongIdSong)

                .then(() => { throw new Error('should not reach this point') })
                .catch(error => {
                   
                    expect(error).to.be.an.instanceOf(NotFoundError)
                    expect(error).not.to.be.undefined
                    expect(error.message).to.equal(`song with id ${wrongIdSong} does not exist`)
                })
        })



    })

    describe('when user does not exist', () => {

        

        beforeEach(() =>
            User.create({ name, surname, email, password })

                .then(user => {

                    idUser = user.id

                    const { playlist } = user

                    return Song.create({ name, artists, file, isFav: true })

                        .then((_song) => {
                            

                            idSong = _song.id
                            return new Playlist({ song: idSong })

                        })
                        .then((list) => {

                            playlist.push(list)
                            user.save()
                        })


                })


        )



        it('should fail on incorrect user id', () => {
           

            const wrongIdUser = '8798ijujhu78'

            updatePlaylist(wrongIdUser, idSong)

                .then(() => { throw new Error('should not reach this point') })
                .catch(error => {
                    expect(error).to.be.an.instanceOf(NotFoundError)
                    expect(error).not.to.be.undefined
                    expect(error.message).to.equal(`user with id ${wrongIdUser} does not exist`)
                })
        })

    })


    after(() => Promise.all([User.deleteMany(), Album.deleteMany(), Song.deleteMany(), Playlist.deleteMany()]).then(() => mongoose.disconnect()))
})