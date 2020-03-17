const { Schema, Types: { ObjectId } } = require('mongoose')

module.exports = new Schema({
    name: {type: String},
    artists: {type: String},
    file: {type: String}
})
