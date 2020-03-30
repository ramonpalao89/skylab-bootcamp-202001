require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { mongoose, models: { User, Album, CartItem, PurchasedAlbums } } = require('modum-data')
const { NotFoundError } = require('modum-errors')
const { expect } = require('chai')
const { random } = Math
const retrievePurchased = require('./retrieve-purchased')

describe('retrievePurchased', () => {
    before(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => Promise.all([User.deleteMany(), Album.deleteMany(), PurchasedAlbums.deleteMany(), CartItem.deleteMany()]))
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
        let _id, _other, idUser, format, idAlbum

        beforeEach(() =>
            User.create({ name, surname, email, password })
                .then(user => {

                    idUser = user.id

                    const { purchasedAlbums } = user

                    let albumObject = new Album({ name, genre, year, priceDigital, priceVinyl, buyers, portrait, songs, artists })
                    let { _id } = albumObject
                    idAlbum = _id.toString()
                    albumObject.save()

                    const purchased = new PurchasedAlbums({ album: idAlbum, format: 'digital' })

                    purchasedAlbums.push(purchased)

                    user.save()

                    return PurchasedAlbums.insertMany(purchased)
                })
        )

        it('should succeed retrieving purchased products', () =>
            retrievePurchased(idUser)
                .then(purchased => {
                    expect(purchased).not.to.be.undefined
                    expect(purchased).to.exist
                    expect(purchased).to.be.an.instanceOf(Object)
                    expect(purchased.length).to.be.greaterThan(0)
                    expect(purchased.length).not.to.be.greaterThan(1)
                    expect(purchased[0].format).to.equal('digital')
                    expect(purchased[0].id).to.equal(idAlbum)

                    return User.findById(idUser)
                })
                .then(user => {
                    const { cart, purchasedAlbums } = user
                    expect(cart).to.exist
                    expect(cart).to.be.an.instanceOf(Object)
                    expect(purchasedAlbums).to.exist
                    expect(purchasedAlbums).to.be.an.instanceOf(Object)
                })
        )

        it('should fail if cart is empty', () => {
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

                })
                retrievePurchased(idUser)
                .then(() => {throw new Error ('should not reach this point')})
                .catch(error => {
                    expect(error).to.exist
                    expect(error).to.be.an.instanceOf(Error)
                    expect(error).not.to.be.undefined
                })
        })

        it('should fail on incorrect user id', () =>
            retrievePurchased(`${idUser}--`)
                .then(() => { throw new Error('should not reach this point') })
                .catch(error => {
                    expect(error).to.be.an.instanceOf(Error)
                    expect(error).not.to.be.undefined
                })
        )
    })

    after(() => Promise.all([User.deleteMany(), Album.deleteMany(), PurchasedAlbums.deleteMany(), CartItem.deleteMany()]).then(() => mongoose.disconnect()))
})