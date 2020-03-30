require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { mongoose, models: { User, ShippingData } } = require('modum-data')
const { NotFoundError } = require('modum-errors')
const { expect } = require('chai')
const { random } = Math
const retrieveShippingInformation = require('./retrieve-shipping-information')

describe('retrieveShippingInformation', () => {
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

                    let { shippingInformation } = user

                    const shippingDetails = new ShippingData({ customerName: customerName, streetAddress: streetAddress, city: city, country: country, phoneNumber: phoneNumber })

                    shippingInformation.push(shippingDetails)

                    user.save()

                    return ShippingData.insertMany(shippingDetails)
                })
        )

        it('should return an array with user shipping details', () =>
            retrieveShippingInformation(idUser)
                .then(allShippingDetails => {
                    expect(allShippingDetails).to.exist
                    expect(allShippingDetails).to.be.instanceOf(Object)
                    expect(allShippingDetails.length).to.be.greaterThan(0)
                    expect(allShippingDetails.length).not.to.be.greaterThan(1)
                    expect(allShippingDetails[0].customerName).to.equal(customerName)
                    expect(allShippingDetails[0].streetAddress).to.equal(streetAddress)
                    expect(allShippingDetails[0].city).to.equal(city)
                    expect(allShippingDetails[0].country).to.equal(country)
                    expect(allShippingDetails[0].phoneNumber).to.equal(phoneNumber)

                })
        )

        it('should fail on incorrect user id', () => {
            retrieveShippingInformation(`${idUser}-wrong`)
                .then(() => { throw new Error('should not reach this point') })
                .catch(error => {
                    expect(error).to.be.an.instanceOf(Error)
                    expect(error).not.to.be.undefined
                    expect(error.message).to.equal(`user with id ${idUser}-wrong does not exist`)
                })
        })

        it('should fail on deactivated user', () => {
            User.create({ name, surname, email, password })
                .then(user => {

                    idUser = user.id
                    user.deactivated = true
                    user.save()
                })
                .then(() => {
                    retrieveShippingInformation(idUser)
                        .then(() => { throw new Error('should not reach this point') })
                        .catch(error => {
                            expect(error).to.be.an.instanceOf(Error)
                            expect(error).not.to.be.undefined
                            expect(error.message).to.equal(`user with id ${idUser} is deactivated`)
                        })
                })
        })

        it('should fail on non-string idUser', () => {
            idUser = 1
            expect(() =>
                retrieveShippingInformation(idUser)
            ).to.Throw(TypeError, `id ${idUser} is not a string`)

            idUser = true
            expect(() =>
                retrieveShippingInformation(idUser)
            ).to.Throw(TypeError, `id ${idUser} is not a string`)

            idUser = undefined
            expect(() =>
                retrieveShippingInformation(idUser)
            ).to.Throw(TypeError, `id ${idUser} is not a string`)
        })
    })

    after(() => Promise.all([User.deleteMany()]).then(() => mongoose.disconnect()))
})