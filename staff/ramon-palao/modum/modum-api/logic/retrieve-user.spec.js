require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { expect } = require('chai')
const { random } = Math
const retrieveUser = require('./retrieve-user')
const { mongoose, models: { User } } = require('modum-data')

describe('retrieveUser', () => {
    before(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => User.deleteMany())
    )

    let name, surname, email, password, users

    beforeEach(() => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        password = `password-${random()}`
    })

    describe('when user already exists', () => {
        let _id

        beforeEach(() =>
            User.create({ name, surname, email, password })
                .then(({ id }) => _id = id)
        )

        it('should succeed on correct and valid and right data', () =>
            retrieveUser(_id)
                .then(user => {
                    expect(user.constructor).to.equal(Object)
                    expect(user.name).to.equal(name)
                    expect(user.surname).to.equal(surname)
                    expect(user.email).to.equal(email)
                    expect(user.password).to.equal(password)
                    expect(user._id).to.be.undefined
                    expect(user.__v).to.be.undefined
                    expect(user.retrieved).to.be.an.instanceOf(Date)
                    expect(user.creditCards).to.exist
                    expect(user.mostPlayedArtists).to.exist
                    expect(user.mostPlayedSongs).to.exist
                    expect(user.shippingInformation).to.exist
                    expect(user.creditCards).to.be.an.instanceOf(Object)
                    expect(user.mostPlayedArtists).to.be.an.instanceOf(Object)
                    expect(user.mostPlayedSongs).to.be.an.instanceOf(Object)
                    expect(user.shippingInformation).to.be.an.instanceOf(Object)
                })
        )

        it('should fail on incorrect user id', () => {
            retrieveUser(`${_id}-wrong`)
                .then(() => { throw new Error('should not reach this point') })
                .catch(error => {
                    expect(error).to.be.an.instanceOf(Error)
                    expect(error).not.to.be.undefined
                    expect(error.message).to.equal(`user with id ${_id}-wrong does not exist`)
                })
        })

        it('should fail on deactivated user', () => {
            User.create({ name, surname, email, password })
                .then(user => {

                    _id = user.id
                    user.deactivated = true
                    user.save()
                })
                .then(() => {
                    retrieveUser(_id)
                        .then(() => { throw new Error('should not reach this point') })
                        .catch(error => {
                            expect(error).to.be.an.instanceOf(Error)
                            expect(error).not.to.be.undefined
                            expect(error.message).to.equal(`user with id ${_id} is deactivated`)
                        })
                })
        })

        it('should fail on non-string _id', () => {
            _id = 1
            expect(() =>
                retrieveUser(_id)
            ).to.Throw(TypeError, `id ${_id} is not a string`)

            _id = true
            expect(() =>
                retrieveUser(_id)
            ).to.Throw(TypeError, `id ${_id} is not a string`)

            _id = undefined
            expect(() =>
                retrieveUser(_id)
            ).to.Throw(TypeError, `id ${_id} is not a string`)
        })
    })

    after(() => User.deleteMany().then(() => mongoose.disconnect()))
})