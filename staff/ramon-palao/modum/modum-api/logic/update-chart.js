const { validate } = require('modum-utils')
const { models: { User, Album, CartItem } } = require('modum-data')
const { NotFoundError } = require('modum-errors')

module.exports = (idUser, idAlbum, format) => {

    validate.string(idUser, 'idUser')
    validate.string(idAlbum, 'idAlbum')
    validate.string(format, 'format')

    return Album.findById(idAlbum)
        .then(album => {

            if (!album) throw new NotFoundError(`album with id ${idAlbum} does not exist`)

            return User.findById(idUser)
                .then(user => {
                    const { cart } = user

                    const cartItem = new CartItem({ album: idAlbum, format })

                    cart.push(cartItem)
                    user.save()
                })
                .then(() => { })
        })
}