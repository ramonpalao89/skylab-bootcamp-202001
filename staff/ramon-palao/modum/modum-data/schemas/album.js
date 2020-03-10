const { Schema, Types: { ObjectId } } = require('mongoose')

module.exports = new Schema({
    name: { type: String, required: true },
    artists: { type: [{ type: ObjectId, ref: 'Artist' }], required: true },
    songs: { type: [{ type: ObjectId, data: Buffer, ref: 'Song'}], required: true},
    genre: {type: String, required: true},
    year: {type: String, required: true},
    portrait: {data: Buffer, type: String, required: true},
    rating: {type: Number},
    buyers: {type: [{ type: ObjectId, ref: 'User'}]}
})