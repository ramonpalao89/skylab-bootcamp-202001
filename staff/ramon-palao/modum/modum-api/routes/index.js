const { Router } = require('express')
const {
    registerUser,
    authenticateUser,
    retrieveUser,
    updateUser,
    retrieveSong
} = require('./handlers')

const { jwtVerifierMidWare } = require('../mid-wares')

const bodyParser = require('body-parser')

const jsonBodyParser = bodyParser.json()

const router = new Router()

router.post('/users', jsonBodyParser, registerUser)

router.post('/users/auth', jsonBodyParser, authenticateUser)

router.get('/users', jwtVerifierMidWare, retrieveUser)

router.patch('/users/:id/update', [jwtVerifierMidWare, jsonBodyParser], updateUser)

router.get('/track/:id/:idSong', retrieveSong)

module.exports = router