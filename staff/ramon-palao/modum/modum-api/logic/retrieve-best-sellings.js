const { validate } = require('modum-utils')
const { models: { Album } } = require('modum-data')
const { NotFoundError } = require('modum-errors')

module.exports = () => {

    return Album.find().sort({buyers: -1})
        .lean()
        .then(album => {

            // if (!album) throw new NotFoundError(`album with id ${idAlbum} does not exist`)


            // album.forEach(item => {
            //     item.id = item._id.toString()

            //     delete item._id
            // })

            return album
        })
}