const { validate } = require('modum-utils')
const { models: { User } } = require('modum-data')
const { NotFoundError, NotAllowedError } = require('modum-errors')

module.exports = (id, idCard) => {
    validate.string(id, 'id')
    validate.string(idCard, 'idCard')

    const oneCreditCard = []

    return User.findById(id)
        .then(user => {
            if (!user) throw new NotFoundError(`user with id ${id} does not exist`)

            if (user.deactivated) throw new NotAllowedError(`user with id ${id} is deactivated`)

            const { creditCards } = user

            creditCards.forEach(item => item._id.toString() === idCard ? oneCreditCard.push(item) : '')

            return oneCreditCard
        })
        .then(oneCreditCard => oneCreditCard)
}