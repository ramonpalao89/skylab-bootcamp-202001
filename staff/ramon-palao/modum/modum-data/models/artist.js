const mongoose = require('mongoose')
const { artist } = require('../schemas')

module.exports = mongoose.model('Artist', artist)