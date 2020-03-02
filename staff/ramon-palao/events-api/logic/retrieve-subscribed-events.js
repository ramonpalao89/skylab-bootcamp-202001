const { validate } = require('../utils')
const { database, database: { ObjectId } } = require('../data')
const { NotFoundError } = require('../errors')

module.exports = (id) => {

    validate.string(id, 'id')

    //const _id = ObjectId(id)

    const events = database.collection('events')

    return events.find({ subscribers: ObjectId(id) }).toArray()
        .then(event => {

            if (!event.length) throw new NotFoundError(`User with id ${id} is not subscribed to any event`)

            return event
        })
}