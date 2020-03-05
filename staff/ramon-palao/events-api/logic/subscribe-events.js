const { validate } = require('events-utils')
const { models: { User, Event } } = require('data')
const { NotAllowedError } = require('events-error')

module.exports = (idUser, idEvent) => {

    validate.string(idUser, 'idUser')
    validate.string(idEvent, 'idEvent')

    return User.find({ subscribedEvents: idEvent })
        .then(user => {
            if (user.length) throw new NotAllowedError(`User with id ${idUser} is already subscribed to this event`)

            return User.findById( idUser )
            .then(user => {
    
                user.subscribedEvents.push(idEvent)
                user.save()
    
            })
        })
        .then(() => Event.findById( idEvent ))
        .then(event => {

            event.subscribers.push(idUser)
            event.save()
        })
        .then(() => { })
}