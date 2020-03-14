const { Router } = require('express')
const {
    registerUser,
    authenticateUser,
    retrieveUser,
    updateUser,
    retrieveSong,
    retrieveAlbum,
    retrieveGenre,
    retrieveYear,
    retrieveSearch
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

router.get('/album/:idAlbum', retrieveAlbum)

router.get('/album/genre/:genreName', retrieveGenre)

router.get('/album/year/:publishYear', retrieveYear)

router.get('/artist', retrieveSearch)

module.exports = router