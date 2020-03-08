const { Schema, SchemaTypes: { ObjectId } } = require('mongoose')
const creditCard = require('./credit-card')

module.exports = new Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    created: { type: Date, required: true, default: Date.now },
    authenticated: { type: Date },
    retrieved: { type: Date },
    publishedEvents: { type: [{ type: ObjectId, ref: 'Event' }] },
    subscribedEvents: { type: [{ type: ObjectId, ref: 'Event' }] },
    //creditCards: {type: [{type: creditCard}]}
    creditCards: [creditCard],
    deactivated: {type: Boolean, default: false}
})