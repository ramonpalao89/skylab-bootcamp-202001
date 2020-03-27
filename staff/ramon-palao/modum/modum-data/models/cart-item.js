const mongoose = require('mongoose')
const { cartItem } = require('../schemas')

module.exports = mongoose.model('CartItem', cartItem)