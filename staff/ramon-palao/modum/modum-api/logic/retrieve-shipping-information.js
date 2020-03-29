const { validate } = require('modum-utils')
const { models: { User } } = require('modum-data')
const { NotFoundError, NotAllowedError } = require('modum-errors')

module.exports = id => {
    validate.string(id, 'id')
    const allShippingDetails = []

    return User.findById(id).lean()
        .then(user => {
            if (!user) throw new NotFoundError(`user with id ${id} does not exist`)

            if (user.deactivated) throw new NotAllowedError(`user with id ${id} is deactivated`)

            const { shippingInformation } = user

            shippingInformation.forEach(item => allShippingDetails.push(item))

            // allShippingDetails.forEach(item => {
            //     item.id = item._id.toString()
            //     delete item._id
            // })

            // if (!allShippingDetails.length) throw new NotFoundError(`user with id ${id} has not saved shipping details yet`)

            return allShippingDetails
        })
        .then(allShippingDetails => allShippingDetails)
}