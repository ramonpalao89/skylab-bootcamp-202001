const { validate } = require('../utils')
const { models: {Event} } = require('../data')
const { NotFoundError } = require('../errors')

module.exports = id => {

    validate.string(id, 'id')

    // const _id = ObjectId(id)

    // const events = database.collection('events')



    return Event.find( {publisher: id} )
        .then(event => {

            if (!event.length) throw new NotFoundError(`User with id ${id} has not published any event`)

            return event
        })
}