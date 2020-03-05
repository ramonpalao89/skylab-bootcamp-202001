const { validate } = require('events-utils')
const { models: {User, Event} } = require('data')
const { NotFoundError } = require('events-error')

module.exports = (idUser, idEvent) => {

    validate.string(idUser, 'idUser')
    validate.string(idEvent, 'idEvent')

    // const events = database.collection('events')
    // const users = database.collection('users')

    return Event.findById(idEvent)
        .then(event => {

            if (!event) throw new NotFoundError (`Event with id ${idEvent} does not exist`)

            return User.findOneAndUpdate(event.publisher, { $pull: { publishedEvents: idEvent } })
            .then(() => User.updateMany( {subscribedEvents: idEvent} , { $pull: { subscribedEvents: {idEvent} } }, {multi: true}))
            .then(() => Event.deleteOne(idEvent))
            .then(() => { })
        })
}