const { validate } = require('../utils')
const { database, database: { ObjectId } } = require('../data')
const { NotFoundError, NotAllowedError } = require('../errors')

module.exports = id => {

    validate.string(id, 'id')

    const _id = ObjectId(id)

    // const users = database.collection('users')
    const events = database.collection('events')
    // const {publisher} = events

    return events.find({ publisher: _id }).toArray()
        .then(event => {

            if (!event) throw new NotFoundError(`User with id ${id} does not have published any event`)

            return event
        })
}