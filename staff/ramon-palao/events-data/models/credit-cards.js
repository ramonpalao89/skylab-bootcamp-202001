const mongoose = require('mongoose')
const { creditCard } = require('../schemas')

module.exports = mongoose.model('creditCard', creditCard)