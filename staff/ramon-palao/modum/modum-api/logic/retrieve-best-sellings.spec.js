require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { mongoose, models: { User, Album } } = require('modum-data')
const { NotFoundError } = require('modum-errors')
const { expect } = require('chai')
const { random } = Math
const retrieveBestSellings = require('./retrieve-best-sellings')

describe('retrieveBestSellings', () => {
    before(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => Promise.all([User.deleteMany(), Album.deleteMany()]))
    )

    let name, surname, email, password, genre, year, priceDigital, priceVinyl, buyers, portrait, songs, artists

    beforeEach(() => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        password = `password-${random()}`
        genre = `genre-${random()}`
        year = `year-${random()}`
        priceDigital = random()
        priceVinyl = random()
        buyers = random()
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
                        albums.push({ name, genre, year, priceDigital, priceVinyl, buyers, portrait, songs, artists })

                    return Album.insertMany(albums)
                })
                .then(([{ id }, { id: other }]) => {
                    _id = id
                    _other = other
                })
        )

        it('should return an array with 5 albums', () =>
            retrieveBestSellings()
                .then(album => {
                    expect(album).to.exist
                    expect(album).to.be.instanceOf(Object)
                    expect(album.length).to.be.greaterThan(0)
                    expect(album.length).not.to.be.greaterThan(5)
                })
        )

        it('should sort albums correctly depending on number of buyers', () =>
            retrieveBestSellings()
            .then(albums => {
                expect(albums).to.exist
                expect(albums.length).to.be.greaterThan(0)
                expect(albums.length).not.to.be.be.greaterThan(5)
                expect(albums[0].buyers).not.to.be.greaterThan(albums[1].buyers)
                expect(albums[1].buyers).not.to.be.greaterThan(albums[2].buyers)
                expect(albums[2].buyers).not.to.be.greaterThan(albums[3].buyers)
                expect(albums[3].buyers).not.to.be.greaterThan(albums[4].buyers)
            })
        )

        it('should fail on incorrect album id', () => {
            retrieveBestSellings(`${_id}-wrong`)
                .then(() => { throw new Error('should not reach this point') })
                .catch(error => {
                    expect(error).to.be.an.instanceOf(Error)
                    expect(error).not.to.be.undefined
                })
        })
    })

    after(() => Promise.all([User.deleteMany(), Album.deleteMany()]).then(() => mongoose.disconnect()))
})