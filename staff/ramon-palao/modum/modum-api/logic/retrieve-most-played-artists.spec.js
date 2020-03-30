require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { mongoose, models: { User } } = require('modum-data')
const { NotFoundError } = require('modum-errors')
const { expect } = require('chai')
const { random } = Math
const retrieveMostPlayedArtists = require('./retrieve-most-played-artists')

describe('retrieveMostPlayedArtists', () => {
    before(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => Promise.all([User.deleteMany()]))
    )

    let name, surname, email, password, subject, value

    beforeEach(() => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        password = `password-${random()}`
        subject = '5e70c7ba345de21988b5b042'
        value = 3

    })

    describe('when user already exists', () => {
        let idUser

        beforeEach(() =>
            User.create({ name, surname, email, password })
                .then(user => {

                    idUser = user.id

                    const { mostPlayedArtists } = user

                    const playedArtist = {}

                    playedArtist.subject = subject
                    playedArtist.value = value

                    mostPlayedArtists.push(playedArtist)

                    user.save()

                    return User.insertMany({name, surname, email, password})
                })
        )

        it('should return an array with most played artists', () =>
            retrieveMostPlayedArtists(idUser)
                .then(artists => {
                    expect(artists).to.exist
                    expect(artists).to.be.instanceOf(Object)
                    expect(artists.length).to.be.greaterThan(0)
                    expect(artists.length).not.to.be.greaterThan(1)
                    expect(artists[0].subject.toString()).to.equal(subject)
                    expect(artists[0].value).to.equal(value)
                })
        )

        it('should fail on incorrect user id', () => {
            retrieveMostPlayedArtists(`${idUser}-wrong`)
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
                    retrieveMostPlayedArtists(idUser)
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