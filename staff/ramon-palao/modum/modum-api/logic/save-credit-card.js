const { validate } = require('modum-utils')
const { models: { User } } = require('modum-data')
const { NotAllowedError, NotFoundError } = require('modum-errors')

module.exports = (issuer, name, number, expiration, cvv, id) => {
    validate.string(issuer, 'issuer')
    validate.string(name, 'name')
    validate.string(number, 'number')
    validate.string(expiration, 'expiration')
    validate.string(cvv, 'cvv')

    const creditCardDetails = {}

    return User.findById(id)
        .then(user => {
            if (!user) throw new NotFoundError(`user with id ${id} not found`)

            let { creditCards } = user

            creditCards.forEach(item => {
                if(item.number === number) throw new NotAllowedError(`Card Number ${number} already exists`)
            })

            creditCardDetails.issuer = issuer
            creditCardDetails.name = name
            creditCardDetails.number = number
            creditCardDetails.expiration = expiration
            creditCardDetails.cvv = cvv

            creditCards.push(creditCardDetails)

            user.save()
        })
        .then(() => { })
}