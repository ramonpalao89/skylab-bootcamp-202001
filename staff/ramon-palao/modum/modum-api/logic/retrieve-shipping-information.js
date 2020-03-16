const { validate } = require('modum-utils')
const { models: { User } } = require('modum-data')
const { NotFoundError, NotAllowedError } = require('modum-errors')

module.exports = id => {
    validate.string(id, 'id')
    const allShippingDetails = []

    return User.findById(id)
        .then(user => {
            if (!user) throw new NotFoundError(`user with id ${id} does not exist`)

            if (user.deactivated) throw new NotAllowedError(`user with id ${id} is deactivated`)

            const { shippingInformation } = user

            shippingInformation.forEach(item => allShippingDetails.push(item))

            return allShippingDetails
        })
        .then(allShippingDetails => allShippingDetails)
}