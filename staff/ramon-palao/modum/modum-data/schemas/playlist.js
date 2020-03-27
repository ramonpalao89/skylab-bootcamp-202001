const { Schema, Types: { ObjectId } } = require('mongoose')

module.exports = new Schema({

    song: {
        type: ObjectId,
        ref: 'Song'
    }
})
