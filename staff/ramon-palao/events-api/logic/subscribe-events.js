const { validate } = require('../utils')
const { database, database: { ObjectId } } = require('../data')
const { NotFoundError, NotAllowedError } = require('../errors')

module.exports = (idUser, idEvent) => {

    validate.string(idUser, 'idUser')
    validate.string(idEvent, 'idEvent')

    //const _id = ObjectId(idUser)

    const events = database.collection('events')
    const users = database.collection('users')

    return users.updateOne({_id: ObjectId(idUser)}, {$push:{subscribedEvents: ObjectId(idEvent)}} )
        .then(() => events.updateOne({_id: ObjectId(idEvent)}, {$push:{subscribers: ObjectId(idUser)}}))
        .then(() => { })

    // return events.find({ publisher: _id }).toArray()
    //     .then(event => {

    //         if (!event.length) throw new NotFoundError(`User with id ${id} has not published any event`)

    //         return event
    //     })
}