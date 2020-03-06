const { random } = Math
const { mongoose, models: { User } } = require('data')
const { retrieveUser } = require('.')
const { v4: uuid } = require('uuid')
const {NotAllowedError, NotFoundError} = require('events-error')

const { env: { REACT_APP_TEST_MONGODB_URL: TEST_MONGODB_URL } } = process

describe('retrieveUser', () => {
    let name, surname, email, password, id

    beforeAll(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => User.deleteMany())
    )

    beforeEach(() => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        password = `password-${random()}`
        id = uuid()
    })

    it('should succeed on retrieving correct user data', () =>{
        retrieveUser(id)
        .then(result => {
            expect(result).toBeDefined()
            expect(typeof result).toBe("object")
            expect(result.name).toBe(name)
            expect(result.surname).toBe(surname)
            expect(result.email).toBe(email)
            expect(result.password).toBe(password)
        })
    })

    it('should fail if user does not exist', ()=>{
        id = "12222222"
        retrieveUser(id)
        .then(() => {throw new Error('should not reach this point')})
        .catch(error => {
            expect(error).toBeDefined()
            expect(error).toBeInstanceOf(NotFoundError, `user with id ${id} does not exist`)
        })
    })

    it('should fail if user has been deactivated', () => {
        id = uuid()
        User.findById({id}).then(user => {
            user.deactivated = true
            user.save()
        })
        retrieveUser(id)
        .then(() => {throw new Error('should not reach this point')})
        .catch(error => {
            expect(error).toBeDefined()
            expect(error).toBeInstanceOf(NotAllowedError, `user with id ${id} is deactivated`)
        })
        
    })


    // describe('when user already exists', () => {
    //     beforeEach(() =>{
    //         const user = User.create({name, surname, email, password})
    //     })
    //     it("should fail if user email already exists", () => {
    //         return registerUser(name, surname, email, password)
    //             .then(() => { throw new Error('should not reach this point') })
    //             .catch(error => {
    //                 expect(error).toBeDefined()
    //                 expect(error).toBeInstanceOf(Error)
    //                 expect(error.message).toBe(`user with email ${email} already exists`)
    //             })   
    //     })
    // })

    

    // TODO unhappy paths and other happies if exist

    afterAll(() => User.deleteMany().then(() => mongoose.disconnect()))
})