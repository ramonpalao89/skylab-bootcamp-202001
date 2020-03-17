const { Schema } = require('mongoose')

module.exports = new Schema({
    customerName: { type: String, required: true },
    streetAddress: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    phoneNumber: {
        type: String, validate: {
            validator: function (v) {
                return /^\d{9}$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number`
        }
    },
})