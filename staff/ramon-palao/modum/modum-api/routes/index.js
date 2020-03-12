const { Router } = require('express')
const {
    registerUser,
    authenticateUser,
    retrieveUser,
    updateUser
} = require('./handlers')

const { jwtVerifierMidWare } = require('../mid-wares')

const bodyParser = require('body-parser')

// const {getTrack, uploadTrack} = require('./tracks')

const jsonBodyParser = bodyParser.json()

const router = new Router()

router.post('/users', jsonBodyParser, registerUser)

router.post('/users/auth', jsonBodyParser, authenticateUser)

router.get('/users', jwtVerifierMidWare, retrieveUser)

router.patch('/users/:id/update', [jwtVerifierMidWare, jsonBodyParser], updateUser)

// router.get('/tracks/:trackId', getTrack )

// router.post('/tracks', uploadTrack )

module.exports = router