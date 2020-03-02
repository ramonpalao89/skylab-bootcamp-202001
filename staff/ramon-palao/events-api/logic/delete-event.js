const { validate } = require('../utils')
const { database, database: { ObjectId } } = require('../data')
const { NotFound } = require('../errors')

module.exports = (idUser, idEvent) => {

    validate.string(idUser, 'idUser')
    validate.string(idEvent, 'idEvent')

    const events = database.collection('events')
    const users = database.collection('users')

    return events.findOne({ _id: ObjectId(idEvent) })
        .then(event => {

            if (!event) throw new NotFound(`Event with id ${idEvent} does not exist`)

            return users.update({ _id: event.publisher }, { $pullAll: { publishedEvents: [ObjectId(idEvent)] } })
            .then(() => users.updateMany({ subscribedEvents: ObjectId(idEvent) }, { $pullAll: { subscribedEvents: [ObjectId(idEvent)] } }))
            .then(() => events.deleteOne({ _id: ObjectId(idEvent)}))
            .then(() => { })
        })
}