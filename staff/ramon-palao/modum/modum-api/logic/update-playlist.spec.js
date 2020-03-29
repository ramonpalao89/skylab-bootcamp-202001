require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { mongoose, models: { User, Album, Song } } = require('modum-data')
const { NotFoundError } = require('modum-errors')
const { expect } = require('chai')
const { random } = Math
const updatePlaylist = require('./update-playlist')

describe('updatePlaylist', () => {
    before(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => Promise.all([User.deleteMany(), Album.deleteMany(), Song.deleteMany()]))
    )

    let name, surname, email, password, artists, file, isFav

    beforeEach(() => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        password = `password-${random()}`
        artists = `artist-${random()}`
        file = `file-${random()}`
        isFav = true
    })

    describe('when user already exists', () => {
        let idSong, idUser, _id

        beforeEach(() =>
            User.create({ name, surname, email, password })
                .then(user => {

                    idUser = user.id

                    let songObject = new Song({ name, artists, file, isFav })
                    let { _id } = songObject
                    idSong = _id.toString()

                    return Song.create(songObject)
                })
                .then(({ id }) => {
                    _id = id
                })
        )

        it('should succeed updating playlist', () => {

            User.create({ name, surname, email, password })
                .then(user => { idUser = user.id })

            updatePlaylist(idUser, _id)
                .then(result => {
                    expect(result).not.to.exist
                    expect(result).to.be.undefined

                    return User.findById(idUser)
                })
                .then(user => {
                    const { playlist } = user
                    expect(playlist).to.exist
                    expect(playlist).to.be.an.instanceOf(Object)
                    // expect(playlist[0]).to.exist
                })
        })

        it('should fail on incorrect song id', () => {
            updatePlaylist(idUser, `${idSong}-wrong`)
            .then(() => { throw new Error('should not reach this point') })
            .catch(error => {
                expect(error).to.be.an.instanceOf(Error)
                expect(error).not.to.be.undefined
            })
        })

        it('should fail on incorrect user id', () => {
            updatePlaylist(`${idUser}--`, idSong)
            .then(() => { throw new Error('should not reach this point') })
            .catch(error => {
                expect(error).to.be.an.instanceOf(Error)
                expect(error).not.to.be.undefined
            })
        })

    })

    after(() => Promise.all([User.deleteMany(), Album.deleteMany(), Song.deleteMany()]).then(() => mongoose.disconnect()))
})