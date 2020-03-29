require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { mongoose, models: { User, Album, CartItem } } = require('modum-data')
const { NotFoundError } = require('modum-errors')
const { expect } = require('chai')
const { random } = Math
const retrieveChart = require('./retrieve-chart')

describe('retrieveChart', () => {
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
        format
    })

    describe('when user already exists', () => {
        let _id, _other, idUser, format

        beforeEach(() =>
            User.create({ name, surname, email, password })
                .then(user => {

                    idUser = user.id

                    const { cart } = user

                    let albumObject = new Album({ name, genre, year, priceDigital, priceVinyl, buyers, portrait, songs, artists })
                    let { _id } = albumObject
                    let idAlbum = _id.toString()
                    albumObject.save()

                    const cartItem = new CartItem({ album: idAlbum, format: 'digital' })

                    cart.push(cartItem)

                    user.save()

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

        it('should succeed returning an array of objects', () =>
            retrieveChart(idUser)
                .then(cartList => {
                    expect(cartList).to.exist
                    expect(cartList).to.be.instanceOf(Object)
                    expect(cartList.length).to.be.greaterThan(0)
                    expect(cartList.length).not.to.be.greaterThan(1)
                    expect(cartList[0].name).to.equal(name)
                    expect(cartList[0].genre).to.equal(genre)
                    expect(cartList[0].year).to.equal(year)
                    expect(cartList[0].priceDigital).to.equal(priceDigital)
                    expect(cartList[0].priceVinyl).to.equal(priceVinyl)
                    expect(cartList[0].portrait).to.equal(portrait)
                    expect(cartList[0].buyers).to.equal(buyers)
                    expect(cartList[0].format).to.equal('digital')
                })
        )

        it('should fail on incorrect user id', () =>
            retrieveChart(`${idUser}--`)
                .then(() => { throw new Error('should not reach this point') })
                .catch(error => {
                    expect(error).to.be.an.instanceOf(Error)
                    expect(error).not.to.be.undefined
                })
        )
    })

    after(() => Promise.all([User.deleteMany(), Album.deleteMany(), CartItem.deleteMany()]).then(() => mongoose.disconnect()))
})