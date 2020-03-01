const { validate } = require('../utils')
const { database, database: { ObjectId } } = require('../data')
const { NotAllowedError } = require('../errors')

module.exports = (idUser, idEvent) => {

    validate.string(idUser, 'idUser')
    validate.string(idEvent, 'idEvent')

    const events = database.collection('events')
    const users = database.collection('users')

    return users.findOne({ _id: ObjectId(idUser) ,  subscribedEvents: ObjectId(idEvent) })
        .then(user => {

            if (user) throw new NotAllowedError(`User with id ${idUser} is already subscribed to this event`)

            return users.updateOne({ _id: ObjectId(idUser) }, { $push: { subscribedEvents: ObjectId(idEvent) } })
            .then(() => events.updateOne({ _id: ObjectId(idEvent) }, { $push: { subscribers: ObjectId(idUser) } }))
            .then(() => { })
        })
}