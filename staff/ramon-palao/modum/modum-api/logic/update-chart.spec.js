require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { mongoose, models: { User, Album, CartItem } } = require('modum-data')
const { NotFoundError } = require('modum-errors')
const { expect } = require('chai')
const { random } = Math
const updateChart = require('./update-chart')

describe('updateChart', () => {
    before(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => Promise.all([User.deleteMany(), Album.deleteMany(), CartItem.deleteMany()]))
    )

    let name, surname, email, password, genre, year, priceDigital, priceVinyl, buyers, portrait, songs, artists, format

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
        format = 'digital'
    })

    describe('when user already exists', () => {
        let _id, _other, idAlbum

        beforeEach(() =>
            User.create({ name, surname, email, password })
                .then(user => {

                    idUser = user.id

                    let albumObject = new Album({ name, genre, year, priceDigital, priceVinyl, buyers, portrait, songs, artists })
                    let { _id } = albumObject
                    idAlbum = _id.toString()
                    albumObject.save()

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

        it('should succeed updating user cart', () => {

            User.create({ name, surname, email, password })
                .then(user => { idUser = user.id })

            updateChart(idUser, idAlbum, format)
                .then(result => {
                    expect(result).not.to.exist
                    expect(result).to.be.undefined

                    return User.findById(idUser)
                })
                .then(user => {
                    const { cart } = user
                    expect(cart).to.exist
                })
        })

    })

    after(() => Promise.all([User.deleteMany(), Album.deleteMany(), CartItem.deleteMany()]).then(() => mongoose.disconnect()))
})