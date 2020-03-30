const { Schema, Types: { ObjectId }} = require('mongoose')

module.exports = new Schema({
    subject: {type: ObjectId},
    value: {type: Number},
    name: {type: String}
})