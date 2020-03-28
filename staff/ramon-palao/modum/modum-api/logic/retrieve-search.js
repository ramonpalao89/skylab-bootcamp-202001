const { validate } = require('modum-utils')
const { models: { Album, Artist } } = require('modum-data')
const { NotFoundError } = require('modum-errors')

module.exports = query => {
    validate.string(query, 'query')

    return Artist.find({ name: { $regex: `${query}` } })
        .lean()
        .then(artist => {

            if (!artist.length) throw new NotFoundError(`Artist ${query} not found`)

            return (async () => {
                const album = await Album.find({ artists: artist[0]._id }).populate('artists', 'name').lean()
                if (!album) throw new NotFoundError(`${query} has not published any album`)

                album.forEach(item => {
                    item.id = item._id.toString()

                    delete item._id
                    delete item.__v
                })

                return album
            })()
        })
}