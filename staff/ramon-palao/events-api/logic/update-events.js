const { validate } = require('../utils')
const { database, database: { ObjectId } } = require('../data')
const { NotFoundError } = require('../errors')

module.exports = (idUser, idEvent, body) => {

    const {title, description, location, date} = body

    validate.string(idUser, 'idUser')
    validate.string(idEvent, 'idEvent')

    const _id = ObjectId(idEvent)

    const events = database.collection('events')
    const users = database.collection('users')


    //debugger
    return users.findOne({ _id: ObjectId(idUser) })
        .then(user => {

            if (!user.publishedEvents) throw new NotFoundError(`User with id ${idUser} has not published any event`)


            return events.findOne({ _id })
                .then(() => events.updateOne({ _id }, { $set: { title, description, location, date } }))
                .then(() => { })

            // return events.updateOne({ _id: ObjectId(idEvent) }, { $set: { title, description, location, date } })
            //     .then(() => { })

        })
}