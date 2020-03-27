const { validate } = require('modum-utils')
const { models: { User, Album } } = require('modum-data')
const { NotFoundError, NotAllowedError } = require('modum-errors')

module.exports = (idUser) => {

    validate.string(idUser, 'idUser')

    return (async () => {
        const user = await User.findById(idUser)
        if (!user) throw new NotFoundError(`User with id ${idUser} not found`)

        let { cart, purchasedAlbums} = user

        if(cart.length){
            for(let i = 0; i < cart.length; i++){
                const album = await Album.findById(cart[i].album).populate('artists', 'name')
                album.buyers === 0 ? album.buyers = 1 : album.buyers++

                // purchasedAlbums.push(cart[i])
                album.save()
                debugger
                purchasedAlbums.push(album)
                cart[i].format === 'digital' ? purchasedAlbums[purchasedAlbums.length -1].format = 'digital' : purchasedAlbums[purchasedAlbums.length -1].format = 'vinyl'
            }
        } else {
            throw new NotAllowedError('Chart is empty')
        }

        cart.splice(0, cart.length)
        user.save()

        return purchasedAlbums
    })()
}