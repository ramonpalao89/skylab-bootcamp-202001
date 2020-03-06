const { random } = Math
const { mongoose, models: { User } } = require('data')
const { authenticateUser } = require('.')
const { NotAllowedError } = require('events-error')

const { env: { REACT_APP_TEST_MONGODB_URL: TEST_MONGODB_URL } } = process

describe.only('authenticateUser', () => {
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

    describe('when user exists', () => {
        let _id

        beforeEach(() => {
            User.create({ name, surname, email, password })
                .then(user => _id = user.id)
        })

        it('should return a valid token on correct credentials', () => {
            authenticateUser(email, password)
                .then(token => {
                    expect(token).toBeDefined()
                    expect(typeof token).toBe("string")
                    expect(token.length).toBeGreaterThan(0)
                    expect(typeof email).toBe("string")
                    expect(typeof password).toBe("string")

                    const { sub } = JSON.parse(atob(token.split('.')[1]))
                    expect(sub).toBe(_id)

                })
        })
    })

    describe('when user does not exist', () => {
        it('should fail on incorrect email', () => {
            authenticateUser(`--${email}`, password)
                .then(() => { throw new Error('should not reach this point') })
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error).toBeInstanceOf(NotAllowedError, `wrong credentials`)
                })
        })

        it('should fail on incorrect password', () => {
            authenticateUser(email, `${password}--`)
                .then(() => { throw new Error('should not reach this point') })
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error).toBeInstanceOf(NotAllowedError, 'Wrong credentials')
                })
        })
    })

    it('should fail on non-string email', () => {
        expect(() => {
            return authenticateUser(true, password)
                .then(() => { throw new Error('Should not reach this point') })
        }).toThrowError(TypeError)

        expect(() => {
            return authenticateUser(2, password)
                .then(() => { throw new Error('Should not reach this point') })
        }).toThrowError(TypeError)

        expect(() => {
            return authenticateUser(undefined, password)
                .then(() => { throw new Error('Should not reach this point') })
        }).toThrowError(TypeError)

        expect(() => {
            return authenticateUser(null, password)
                .then(() => { throw new Error('Should not reach this point') })
        }).toThrowError(TypeError)

        expect(() => {
            return authenticateUser([], password)
                .then(() => { throw new Error('Should not reach this point') })
        }).toThrowError(TypeError)
    })

    it('should fail on non-string password', () => {
        expect(() => {
            return authenticateUser(email, true)
                .then(() => { throw new Error('Should not reach this point') })
        }).toThrowError(TypeError)

        expect(() => {
            return authenticateUser(email, 2)
                .then(() => { throw new Error('Should not reach this point') })
        }).toThrowError(TypeError)

        expect(() => {
            return authenticateUser(email, undefined)
                .then(() => { throw new Error('Should not reach this point') })
        }).toThrowError(TypeError)

        expect(() => {
            return authenticateUser(email, null)
                .then(() => { throw new Error('Should not reach this point') })
        }).toThrowError(TypeError)

        expect(() => {
            return authenticateUser(email, [])
                .then(() => { throw new Error('Should not reach this point') })
        }).toThrowError(TypeError)
    })

    afterAll(() => User.deleteMany().then(() => mongoose.disconnect()))
})