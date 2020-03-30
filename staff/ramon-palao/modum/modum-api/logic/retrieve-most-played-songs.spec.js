require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { mongoose, models: { User } } = require('modum-data')
const { NotFoundError } = require('modum-errors')
const { expect } = require('chai')
const { random } = Math
const retrieveMostPlayedSongs = require('./retrieve-most-played-songs')

describe('retrieveMostPlayedSongs', () => {
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

                    const { mostPlayedSongs } = user

                    const playedSongs = {}

                    playedSongs.subject = subject
                    playedSongs.value = value

                    mostPlayedSongs.push(playedSongs)

                    user.save()

                    return User.insertMany({name, surname, email, password})
                })
        )

        it('should return an array with most played songs', () =>
            retrieveMostPlayedSongs(idUser)
                .then(songs => {
                    expect(songs).to.exist
                    expect(songs).to.be.instanceOf(Object)
                    expect(songs).not.to.be.undefined
                    expect(songs.length).to.be.greaterThan(0)
                    expect(songs[0].value).to.equal(value)
                    expect(songs[0].subject.toString()).to.equal(subject)
                })
        )

        it('should fail on incorrect user id', () => {
            retrieveMostPlayedSongs(`${idUser}-wrong`)
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
                    retrieveMostPlayedSongs(idUser)
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