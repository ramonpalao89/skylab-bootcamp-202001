require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { mongoose, models: { User } } = require('modum-data')
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

                    const shippingDetails = {}

                    shippingDetails.customerName = customerName
                    shippingDetails.streetAddress = streetAddress
                    shippingDetails.city = city
                    shippingDetails.country = country
                    shippingDetails.phoneNumber = phoneNumber

                    shippingInformation.push(shippingDetails)

                    user.save()
                })
        )

        it('should return an array with user shipping details', () =>
            retrieveShippingInformation(idUser)
                .then(allShippingDetails => {
                    expect(allShippingDetails).to.exist
                    expect(allShippingDetails).to.be.instanceOf(Object)
                })
        )

        it('should fail on incorrect user id', () => {
            retrieveShippingInformation(`${idUser}-wrong`)
                .then(() => { throw new Error('should not reach this point') })
                .catch(error => {
                    expect(error).to.be.an.instanceOf(Error)
                    expect(error).not.to.be.undefined
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
                        })
                })
        })
    })

    after(() => Promise.all([User.deleteMany()]).then(() => mongoose.disconnect()))
})