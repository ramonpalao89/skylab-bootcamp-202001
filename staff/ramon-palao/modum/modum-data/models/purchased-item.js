const mongoose = require('mongoose')
const { purchasedAlbums } = require('../schemas')

module.exports = mongoose.model('PurchasedAlbums', purchasedAlbums)