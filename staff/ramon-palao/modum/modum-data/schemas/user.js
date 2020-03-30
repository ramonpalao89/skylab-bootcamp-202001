const { Schema, Types: { ObjectId } } = require('mongoose')
const creditCard = require('./credit-card')
const counter = require('./counter')
const shippingData = require('./shipping-data')
const cartItem = require('./cart-item')
const purchasedAlbums = require('./purchased-item')
const playlist = require('./playlist')

module.exports = new Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    city: { type: String },
    age: { type: String },
    created: { type: Date, required: true, default: Date.now },
    authenticated: { type: Date },
    retrieved: { type: Date },
    mostPlayedSongs: [counter],
    mostPlayedArtists: [counter],
    freeSong: [counter],
    purchasedAlbums: [purchasedAlbums],
    playlist: [playlist],
    creditCards: [creditCard],
    cart: [cartItem],
    shippingInformation: [shippingData]
})