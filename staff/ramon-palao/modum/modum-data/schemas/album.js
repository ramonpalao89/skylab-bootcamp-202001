const { Schema, Types: { ObjectId } } = require('mongoose')

module.exports = new Schema({
    name: { type: String, required: true },
    artists: { type: [{ type: String, ref: 'Artist' }], required: true },
    songs: { type: [{ type: String, ref: 'Song'}], required: true},
    genre: {type: String, required: true},
    year: {type: String, required: true},
    priceVinyl: {type: String, required: true},
    priceDigital: {type: String, required: true},
    quantity: {type: Number, default: 0},
    portrait: {type: String, required: true},
    rating: {type: Number},
    buyers: {type: Number, default: 0}
})