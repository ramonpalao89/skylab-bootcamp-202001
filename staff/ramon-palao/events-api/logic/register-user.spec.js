const { expect } = require('chai')
// require('mocha')
// const {validate} = require('./utils')
const { users } = require('../data')
const fs = require('fs').promises
const path = require('path')
const uuid = require('uuid/v4')
const { registerUser } = require('../logic')
const jwt = require('jsonwebtoken')
const { NotAllowedError } = require('../errors')

describe('Register User', () => {
    let name, surname, email, password, id

    beforeEach(() => {
        name = 'name' + Math.random()
        surname = 'surname' + Math.random()
        email = Math.random() + 'email@mail.com'
        password = '123'
        id = uuid()
    })

    describe('when email already exists', () => {
        beforeEach(() => {
            const user = {name, surname, email, password, id, registered: new Date}
            users.push(user)
            return fs.writeFile(path.join(__dirname, '../data/users.json'), JSON.stringify(users, null, 4))
        })

        it('should fail on existing email', () => {
            expect(() => {
                return registerUser(`${name}-, ${surname}-, ${email}, ${password}-`)
                .then(() => {throw new Error('should not reach this point')})
                .to.throw(NotAllowedError)
            })
        })

    })
})