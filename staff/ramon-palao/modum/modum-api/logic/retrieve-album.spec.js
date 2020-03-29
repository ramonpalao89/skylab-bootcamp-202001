require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { mongoose, models: { User, Album } } = require('modum-data')
const { NotFoundError } = require('modum-errors')
const { expect } = require('chai')
const { random } = Math
const retrieveAlbum = require('./retrieve-album')

describe('retrieveAlbum', () => {
    before(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => Promise.all([User.deleteMany(), Album.deleteMany()]))
    )

    let name, surname, email, password, genre, year, priceDigital, priceVinyl, portrait, songs, artists

    beforeEach(() => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        password = `password-${random()}`
        genre = `genre-${random()}`
        year = `year-${random()}`
        priceDigital = random()
        priceVinyl = random()
        portrait = `portrait-${random()}`
        songs = []
        artists = []
    })

    describe('when user already exists', () => {
        let _id, _other

        beforeEach(() =>
            User.insertMany([
                { name, surname, email, password },
                { name, surname, email, password }
            ])
                .then(() => {
                    const albums = []

                    const now = new Date

                    date = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate())

                    for (let i = 0; i < 20; i++)
                        albums.push({ name, genre, year, priceDigital, priceVinyl, portrait, songs, artists })

                    return Album.insertMany(albums)
                })
                .then(([{ id }, { id: other }]) => {
                    _id = id
                    _other = other
                })
        )

        it('should succeed on correct and valid and right data', () =>
            retrieveAlbum(_id)
                .then(album => {
                    expect(album).to.exist
                    expect(album).to.be.instanceOf(Object)
                    expect(album.artists).to.be.instanceOf(Array)
                    expect(album.songs).to.be.instanceOf(Array)
                    expect(album.name).to.equal(name)
                    expect(album.genre).to.equal(genre)
                    expect(album.year).to.equal(year)
                    expect(album.priceDigital).to.equal(priceDigital)
                    expect(album.priceVinyl).to.equal(priceVinyl)
                    expect(album.portrait).to.equal(portrait)
                })
        )

        it('should fail on incorrect album id', () => {
            retrieveAlbum(`${_id}-wrong`)
                .then(() => { throw new Error('should not reach this point') })
                .catch(error => {
                    expect(error).to.be.an.instanceOf(Error)
                    expect(error).not.to.be.undefined
                })
        })
    })

    after(() => Promise.all([User.deleteMany(), Album.deleteMany()]).then(() => mongoose.disconnect()))
})