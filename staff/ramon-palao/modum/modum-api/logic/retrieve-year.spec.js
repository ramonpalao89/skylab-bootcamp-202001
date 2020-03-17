require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { mongoose, models: { User, Album, Artist } } = require('modum-data')
const { expect } = require('chai')
const { random } = Math
const retrieveYear = require('./retrieve-year')

describe.only('retrieveYear', () => {
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
        year = `2020`
        priceDigital = `priceDigital-${random()}`
        priceVinyl = `priceVinyl-${random()}`
        portrait = `portrait-${random()}`
        artistObject = new Artist({ name })
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

        it('should succeed retrieving albums published 2 years ago', () => {
            const albums = []
            name = `name-${random()}`
            genre = `genre-${random()}`
            year = `2020`
            priceDigital = `priceDigital-${random()}`
            priceVinyl = `priceVinyl-${random()}`
            portrait = `portrait-${random()}`
            artistObject = new Artist({ name })
            let { _id } = artistObject
            idArtist = _id.toString()
            artists = [idArtist]
            songs = [name]

            for (let i = 0; i < 20; i++) {
                albums.push({ name, genre, year, priceDigital, priceVinyl, portrait, songs, artists })
            }

            Album.insertMany(albums)
            let publishYear = "2"
            return retrieveYear(publishYear)
                .then(album => {
                    expect(album).to.exist
                    expect(album).to.be.an.instanceOf(Array)
                    expect(album.length).to.be.greaterThan(0)
                })
        })

        it('should succeed retrieving albums published on current year', () => {
            const albums = []
            name = `name-${random()}`
            genre = `genre-${random()}`
            year = `2020`
            priceDigital = `priceDigital-${random()}`
            priceVinyl = `priceVinyl-${random()}`
            portrait = `portrait-${random()}`
            artistObject = new Artist({ name })
            let { _id } = artistObject
            idArtist = _id.toString()
            artists = [idArtist]
            songs = [name]

            for (let i = 0; i < 20; i++) {
                albums.push({ name, genre, year, priceDigital, priceVinyl, portrait, songs, artists })
            }

            Album.insertMany(albums)
            let publishYear = "1"
            return retrieveYear(publishYear)
                .then(album => {
                    expect(album).to.exist
                    expect(album).to.be.an.instanceOf(Array)
                    expect(album.length).to.be.greaterThan(0)
                })
        })

        it('should succeed retrieving albums published 5 years ago', () => {
            const albums = []
            name = `name-${random()}`
            genre = `genre-${random()}`
            year = `2015`
            priceDigital = `priceDigital-${random()}`
            priceVinyl = `priceVinyl-${random()}`
            portrait = `portrait-${random()}`
            artistObject = new Artist({ name })
            let { _id } = artistObject
            idArtist = _id.toString()
            artists = [idArtist]
            songs = [name]

            for (let i = 0; i < 20; i++) {
                albums.push({ name, genre, year, priceDigital, priceVinyl, portrait, songs, artists })
            }

            Album.insertMany(albums)
            let publishYear = "5"
            return retrieveYear(publishYear)
                .then(album => {
                    expect(album).to.exist
                    expect(album).to.be.an.instanceOf(Array)
                    expect(album.length).to.be.greaterThan(0)
                })
        })

        it('should succeed retrieving albums published more than 10 years ago', () => {
            const albums = []
            name = `name-${random()}`
            genre = `genre-${random()}`
            year = `1984`
            priceDigital = `priceDigital-${random()}`
            priceVinyl = `priceVinyl-${random()}`
            portrait = `portrait-${random()}`
            artistObject = new Artist({ name })
            let { _id } = artistObject
            idArtist = _id.toString()
            artists = [idArtist]
            songs = [name]

            for (let i = 0; i < 20; i++) {
                albums.push({ name, genre, year, priceDigital, priceVinyl, portrait, songs, artists })
            }

            Album.insertMany(albums)
            let publishYear = "11"
            return retrieveYear(publishYear)
                .then(album => {
                    expect(album).to.exist
                    expect(album).to.be.an.instanceOf(Array)
                    expect(album.length).to.be.greaterThan(0)
                })
        })

        // it('should fail on retrieving an album published more than 10 years ago if actual published year is current year', () => {
        //     const albums = []
        //     name = `name-${random()}`
        //     genre = `genre-${random()}`
        //     year = `2020`
        //     priceDigital = `priceDigital-${random()}`
        //     priceVinyl = `priceVinyl-${random()}`
        //     portrait = `portrait-${random()}`
        //     artistObject = new Artist({ name })
        //     let { _id } = artistObject
        //     idArtist = _id.toString()
        //     artists = [idArtist]
        //     songs = [name]

        //     for (let i = 0; i < 20; i++) {
        //         albums.push({ name, genre, year, priceDigital, priceVinyl, portrait, songs, artists })
        //     }

        //     Album.insertMany(albums)
        //     let publishYear = "more-than-ten"
        //     return retrieveYear(publishYear)
        //         .then(() => { throw new Error('should not reach this point') })
        //         .catch(error => {
        //             expect(error).to.be.an.instanceOf(Error)
        //             expect(error).not.to.be.undefined
        //             expect(error.message).to.equal(`no albums published ${publishYear} years ago`)
        //         })
        // })
    })

    after(() => Promise.all([User.deleteMany(), Album.deleteMany()]).then(() => mongoose.disconnect()))
})