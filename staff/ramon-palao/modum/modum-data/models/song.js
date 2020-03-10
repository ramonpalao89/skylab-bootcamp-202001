const mongoose = require('mongoose')
const { song } = require('../schemas')

module.exports = mongoose.model('Song', song)