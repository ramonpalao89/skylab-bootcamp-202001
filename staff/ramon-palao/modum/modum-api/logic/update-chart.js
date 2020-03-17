const { validate } = require('modum-utils')
const { models: { User, Album } } = require('modum-data')
const { NotFoundError } = require('modum-errors')

module.exports = (idUser, idAlbum) => {

    validate.string(idUser, 'idUser')
    validate.string(idAlbum, 'idAlbum')

    return Album.findById(idAlbum)
        .then(album => {

            if (!album) throw new NotFoundError(`album with id ${idAlbum} does not exist`)

            return User.findById(idUser)
                .then(user => {
                    const { chart } = user
                    chart.push(idAlbum)
                    user.save()
                })
                .then(() => { })
        })
}