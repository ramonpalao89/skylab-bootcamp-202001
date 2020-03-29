require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { mongoose, models: { User } } = require('modum-data')
const { NotFoundError } = require('modum-errors')
const { expect } = require('chai')
const { random } = Math
const retrieveCreditCard = require('./retrieve-credit-card')

describe('retrieveCreditCard', () => {
    before(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => Promise.all([User.deleteMany()]))
    )

    let name, surname, email, password, issuer, number, expiration, cvv

    beforeEach(() => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        password = `password-${random()}`
        issuer = 'Visa'
        number = '1234123412341234'
        expiration = `expiration-${random()}`
        cvv = '123'

    })

    describe('when user already exists', () => {
        let idUser

        beforeEach(() =>
            User.create({ name, surname, email, password })
                .then(user => {

                    idUser = user.id

                    const { creditCards } = user

                    creditCardDetails = {}

                    creditCardDetails.issuer = issuer
                    creditCardDetails.name = name
                    creditCardDetails.number = number
                    creditCardDetails.expiration = expiration
                    creditCardDetails.cvv = cvv

                    creditCards.push(creditCardDetails)

                    user.save()
                })
        )

        it('should return an array with user credit cards', () =>
            retrieveCreditCard(idUser)
                .then(creditCard => {
                    expect(creditCard).to.exist
                    expect(creditCard).to.be.instanceOf(Object)
                })
        )

        it('should fail on incorrect user id', () => {
            retrieveCreditCard(`${idUser}-wrong`)
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
                    retrieveCreditCard(idUser)
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