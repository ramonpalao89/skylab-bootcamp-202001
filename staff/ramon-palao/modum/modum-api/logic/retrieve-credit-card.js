const { validate } = require('modum-utils')
const { models: { User } } = require('modum-data')
const { NotFoundError, NotAllowedError } = require('modum-errors')

module.exports = id => {
    validate.string(id, 'id')
    const allCreditCards = []

    return User.findById(id).lean()
        .then(user => {
            if (!user) throw new NotFoundError(`user with id ${id} does not exist`)

            if (user.deactivated) throw new NotAllowedError(`user with id ${id} is deactivated`)

            const { creditCards } = user

            creditCards.forEach(item => allCreditCards.push(item))

            allCreditCards.forEach(item => {
                item.id = item._id.toString()
                delete item._id
            })

            // if (!allCreditCards.length) throw new NotFoundError(`user with id ${id} has not saved card details yet`)

            return allCreditCards
        })
        .then(allCreditCards => allCreditCards)
}