const { Schema, Types: { ObjectId } } = require('mongoose')

module.exports = new Schema({

    album: {
        type: ObjectId,
        ref: 'Album'
    },

    format: {
        type: String,
        enum: ['digital', 'vinyl'],
        default: 'digital'
    }
})
