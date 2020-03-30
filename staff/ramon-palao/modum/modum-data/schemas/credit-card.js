const { Schema } = require('mongoose')

module.exports = new Schema({
    issuer: { type: String, enum: ['Visa', 'Mastercard', 'American Express', 'Apple Card'], default: 'Visa', required: true },
    name: { type: String },
    number: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^\d{16}$/.test(v);
            },
            message: props => `${props.value} is not a valid credit card number`
        },
    },
    expiration: { type: String, required: true },
    cvv: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^\d{3}$/.test(v);
            },
            message: props => `${props.value} is not a valid CVV number`
        }
    }
})