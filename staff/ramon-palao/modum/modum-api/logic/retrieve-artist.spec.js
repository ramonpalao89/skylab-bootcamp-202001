require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { mongoose, models: { User, Album, Artist } } = require('modum-data')
const { expect } = require('chai')
const { random } = Math
const retrieveArtist = require('./retrieve-artist')

describe('retrieveArtist', () => {
    before(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => Promise.all([User.deleteMany(), Album.deleteMany()]))
    )

    let name, surname, email, password, genre, year, priceDigital, priceVinyl, portrait, artistObject, artists

    beforeEach(() => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        password = `password-${random()}`
        genre = `genre-${random()}`
        year = `year-${random()}`
        priceDigital = `${random()}`
        priceVinyl = `${random()}`
        portrait = `portrait-${random()}`
        artistObject = new Artist({name})
        let { _id } = artistObject
        idArtist = _id.toString()
        artists = [idArtist]
        songs = [name]
    })

    describe('when album already exists', () => {
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
            retrieveArtist(idArtist)
                .then(artist => {
                    expect(artist).to.exist
                    expect(artist).to.be.an.instanceOf(Object)
                    expect(artist.artists).to.be.an.instanceOf(Array)
                    expect(artist.portrait).to.exist
                    expect(artist.portrait).to.equal(portrait)
                })
        )

        it('should fail on incorrect artist id', () => {
            retrieveArtist(`${idArtist}-wrong`)
                .then(() => { throw new Error('should not reach this point') })
                .catch(error => {
                    expect(error).to.be.an.instanceOf(Error)
                    expect(error).not.to.be.undefined
                    expect(error.message).to.equal(`Artist with id ${idArtist}-wrong not found`)
                })
        })
    })

    after(() => Promise.all([User.deleteMany(), Album.deleteMany()]).then(() => mongoose.disconnect()))
})