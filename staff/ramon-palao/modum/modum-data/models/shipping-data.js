const mongoose = require('mongoose')
const { shippingData } = require('../schemas')

module.exports = mongoose.model('ShippingData', shippingData)