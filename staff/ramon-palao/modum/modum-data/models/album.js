const mongoose = require('mongoose')
const { album } = require('../schemas')

module.exports = mongoose.model('Album', album)
