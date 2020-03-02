const { validate } = require('../utils')
const { database, database: { ObjectId } } = require('../data')
const { NotFoundError } = require('../errors')

module.exports = (idUser, idEvent, body) => {

    const {title, description, location, date} = body

    const _event = {}

    if (typeof title !== "undefined"){
        validate.string(title, 'title')
        _event["title"] = title
    }

    if (typeof description !== "undefined"){
        validate.string(description, 'description')
        _event["description"] = description
    }

    if (typeof location !== "undefined"){
        validate.string(location, 'location')
        _event["location"] = location
    }

    if (typeof date !== "undefined"){
        validate.string(date, 'date')
        _event["date"] = date
    }

    validate.string(idUser, 'idUser')
    validate.string(idEvent, 'idEvent')

    const events = database.collection('events')
    const users = database.collection('users')


    //debugger
    return users.findOne({ _id: ObjectId(idUser) })
        .then(user => {

            //if (user.publishedEvents: (ObjectId(idEvent))) throw new NotFoundError(`User with id ${idUser} cannot update this event`)


            return events.findOne({ _id: ObjectId(idEvent) })
                .then(() => events.update({ _id: ObjectId(idEvent) }, {$set: _event }))
                .then(() => { })
        })
}