const { Schema, Types: { ObjectId } } = require('mongoose')
const creditCard = require('./credit-card')
const counter = require('./counter')
const shippingData = require('./shipping-data')

module.exports = new Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    city: { type: String },
    age: { type: String },
    created: { type: Date, required: true, default: Date.now },
    authenticated: { type: Date },
    retrieved: { type: Date },
    mostPlayedSongs: [counter],
    mostPlayedArtists: [counter],
    freeSong: [counter],
    purchasedAlbums: { type: [{ type: ObjectId, ref: 'Album' }] },
    playlist: { type: [{ type: ObjectId, ref: 'Song' }] },
    creditCards: [creditCard],
    chart: { type: [{ type: ObjectId, ref: 'Album' }] },
    shippingInformation: [shippingData]
})