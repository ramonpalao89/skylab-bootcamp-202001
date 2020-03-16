const { validate } = require('modum-utils')
const { models: { Album } } = require('modum-data')
const { NotFoundError } = require('modum-errors')

module.exports = (publishYear) => {

    validate.string(publishYear, 'publishYear')

    if (publishYear !== 'more-than-ten') {
        return Album.find({ year: { $gte: new Date().getFullYear() - publishYear } })
            .lean()
            .then(album => {

                if (!album.length) throw new NotFoundError(`no albums published ${publishYear} years ago`)

                album.forEach(item => {
                    item.id = item._id.toString()
    
                    delete item._id
                    delete item.__v
                })

                return album
            })
    } else {
        return Album.find({ year: { $lt: new Date().getFullYear() - 10 } })
            .lean()
            .then(album => {

                if (!album.length) throw new NotFoundError(`no albums published ${publishYear} years ago`)

                album.forEach(item => {
                    item.id = item._id.toString()
    
                    delete item._id
                    delete item.__v
                })

                return album
            })
    }
}