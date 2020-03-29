require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { mongoose, models: { User } } = require('modum-data')
const { NotFoundError } = require('modum-errors')
const { expect } = require('chai')
const { random } = Math
const saveShippingInfo = require('./save-shipping-info')

describe('saveShippingInfo', () => {
    before(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => Promise.all([User.deleteMany()]))
    )

    let name, surname, email, password, customerName, streetAddress, city, country, phoneNumber

    beforeEach(() => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        password = `password-${random()}`
        customerName = `customerName-${random()}`
        streetAddress = `streetAddress-${random()}`
        city = `city-${city}`
        country = `country-${country}`
        phoneNumber = `111111111`
    })

    describe('when user already exists', () => {
        let idUser

        beforeEach(() =>
            User.create({ name, surname, email, password })
                .then(user => {

                    idUser = user.id

                })
        )

        it('should succeed updating user credit card', () => {

            User.create({ name, surname, email, password })
                .then(user => { idUser = user.id })

            saveShippingInfo(customerName, streetAddress, city, country, phoneNumber, idUser)
                .then(result => {
                    expect(result).not.to.exist
                    expect(result).to.be.undefined

                    return User.findById(idUser)
                })
                .then(user => {
                    const { shippingInformation } = user
                    expect(shippingInformation).to.exist
                })
        })

        it('should fail on incorrect user id', () =>
            saveShippingInfo(customerName, streetAddress, city, country, phoneNumber, `${idUser}--`)
                .then(() => { throw new Error('should not reach this point') })
                .catch(error => {
                    expect(error).to.be.an.instanceOf(Error)
                    expect(error).not.to.be.undefined
                })
        )

    })

    after(() => Promise.all([User.deleteMany()]).then(() => mongoose.disconnect()))
})