const { validate } = require('modum-utils')
const { models: { User, Album, PurchasedAlbums } } = require('modum-data')
const { NotFoundError, NotAllowedError } = require('modum-errors')

module.exports = (idUser) => {

    validate.string(idUser, 'idUser')

    return (async () => {
        const user = await User.findById(idUser)
        if (!user) throw new NotFoundError(`User with id ${idUser} not found`)

        let { cart, purchasedAlbums } = user

        if (cart.length) {
            for (let i = 0; i < cart.length; i++) {
                const album = await Album.findById(cart[i].album).populate('artists', 'name')
                album.buyers === 0 ? album.buyers = 1 : album.buyers++

                album.save()
                const purchasedItem = new PurchasedAlbums({ album: cart[i].album, format: cart[i].format })

                purchasedAlbums.push(purchasedItem)
                user.save()
            }
        } else {
            throw new NotAllowedError('Chart is empty')
        }

        cart.splice(0, cart.length)
        user.save()

        return
    })()
}