const mongoose = require('mongoose')
const { playlist } = require('../schemas')

module.exports = mongoose.model('Playlist', playlist)