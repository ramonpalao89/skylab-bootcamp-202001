const { validate } = require('../utils')
const { database, database: { ObjectId } } = require('../data')
const { NotFoundError, NotAllowedError } = require('../errors')

module.exports = id => {

    validate.string(id, 'id')

    const _id = ObjectId(id)

    const events = database.collection('events')

    return events.find({ publisher: _id }).toArray()
        .then(event => {

            if (!event.length) throw new NotFoundError(`User with id ${id} has not published any event`)

            return event
        })
}