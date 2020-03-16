const { validate } = require('modum-utils')
const { models: { User } } = require('modum-data')
const { NotFoundError } = require('modum-errors')

module.exports = (customerName, streetAddress, city, country, phoneNumber, id) => {
    validate.string(customerName, 'customerName')
    validate.string(streetAddress, 'streetAddress')
    validate.string(city, 'city')
    validate.string(country, 'country')
    validate.string(phoneNumber, 'phoneNumber')

    const shippingDetails = {}

    return User.findById(id)
        .then(user => {
            if (!user) throw new NotFoundError(`user with id ${id} not found`)

            let { shippingInformation } = user

            shippingDetails.customerName = customerName
            shippingDetails.streetAddress = streetAddress
            shippingDetails.city = city
            shippingDetails.country = country
            shippingDetails.phoneNumber = phoneNumber

            shippingInformation.push(shippingDetails)

            user.save()
        })
        .then(() => { })
}