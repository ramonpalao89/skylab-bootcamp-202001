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
    retrieveSearch,
    retrieveArtist,
    retrieveSongName,
    updateChart,
    retrieveChart,
    buyProducts,
    updatePlaylist,
    retrievePlaylist,
    retrieveBestSellings,
    saveCreditCard,
    retrieveCreditCards,
    retrieveOneCreditCard,
    retrieveMostPlayedSongs,
    retrieveMostPlayedArtists,
    saveShippingInformation,
    retrieveShippingInformation,
    retrieveOneShipping,
    retrievePortrait
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

router.get('/artist/:idArtist', retrieveArtist)

router.get('/track-name/:idSong', retrieveSongName)

router.patch('/chart/:idAlbum', jwtVerifierMidWare, updateChart)

router.get('/chart', jwtVerifierMidWare, retrieveChart)

router.patch('/purchase', jwtVerifierMidWare, buyProducts)

router.patch('/playlist/:idSong', jwtVerifierMidWare, updatePlaylist)

router.get('/playlist', jwtVerifierMidWare, retrievePlaylist)

router.get('/best-sellings', retrieveBestSellings)

router.post('/credit-card/:id', [jwtVerifierMidWare, jsonBodyParser], saveCreditCard)

router.get('/credit-card', jwtVerifierMidWare, retrieveCreditCards)

router.get('/credit-card/:idCard', jwtVerifierMidWare, retrieveOneCreditCard)

router.get('/most-played-songs', jwtVerifierMidWare, retrieveMostPlayedSongs)

router.get('/most-played-artists', jwtVerifierMidWare, retrieveMostPlayedArtists)

router.post('/shipping-information/:id', [jwtVerifierMidWare, jsonBodyParser], saveShippingInformation)

router.get('/shipping-information', jwtVerifierMidWare, retrieveShippingInformation)

router.get('/shipping-information/:idShipping', jwtVerifierMidWare, retrieveOneShipping)

router.get('/portrait/:idAlbum', retrievePortrait)

module.exports = router