const { validate } = require('../utils')
const { database, database: { ObjectId } } = require('../data')
const { NotFoundError, NotAllowedError } = require('../errors')

module.exports = () => {

    const events = database.collection('events')

    const now = new Date

    return events.find({ date : {$gt: now }}).toArray()
        .then(event => {

            if (!event.length) throw new NotFoundError(`There are no events coming soon`)

            return event
        })
}