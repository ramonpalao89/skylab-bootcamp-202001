const { validate } = require('modum-utils')
const { models: { User } } = require('modum-data')
const { NotFoundError, NotAllowedError } = require('modum-errors')

module.exports = (id, idShipping) => {
    validate.string(id, 'id')
    validate.string(idShipping, 'idShipping')

    const oneShipping = []

    return User.findById(id).lean()
        .then(user => {
            if (!user) throw new NotFoundError(`user with id ${id} does not exist`)

            if (user.deactivated) throw new NotAllowedError(`user with id ${id} is deactivated`)

            const { shippingInformation } = user

            shippingInformation.forEach(item => item._id.toString() === idShipping ? oneShipping.push(item) : '')

            oneShipping.forEach(item => {
                item.id = item._id.toString()
                delete item._id
            })

            if (!oneShipping.length) throw new NotFoundError(`Shipping details with id ${id} does not exist`)

            return oneShipping
        })
        .then(oneShipping => oneShipping)
}