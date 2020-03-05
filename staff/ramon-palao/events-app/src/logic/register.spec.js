//require('dotenv').config()

const { random } = Math
const { mongoose, models: { User } } = require('data')
const { registerUser } = require('.')
const {NotAllowedError} = require('events-error')

const { env: { REACT_APP_TEST_MONGODB_URL: TEST_MONGODB_URL } } = process

describe('registerUser', () => {
    let name, surname, email, password

    beforeAll(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => User.deleteMany())
    )

    beforeEach(() => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        password = `password-${random()}`
    })

    it('should succeed on correct user data', () =>
        registerUser(name, surname, email, password)
            .then(result => {
                expect(result).not.toBeDefined()
                debugger

                return User.findOne({ email })
            })
            .then(user => {
                expect(user).toBeDefined()
                expect(typeof user.id).toBe('string')
                expect(user.name).toBe(name)
                expect(user.surname).toBe(surname)
                expect(user.email).toBe(email)
                expect(user.password).toBe(password) // TODO encrypt this field!
                expect(user.created).toBeInstanceOf(Date)
            })

    )
    describe('when user already exists', () => {
        beforeEach(() =>{
            const user = User.create({name, surname, email, password})
        })
        it("should fail if user email already exists", () => {
            return registerUser(name, surname, email, password)
                .then(() => { throw new Error('should not reach this point') })
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error).toBeInstanceOf(Error)
                    expect(error.message).toBe(`user with email ${email} already exists`)
                })   
        })
    })

    

    // TODO unhappy paths and other happies if exist

    afterAll(() => User.deleteMany().then(() => mongoose.disconnect()))
})