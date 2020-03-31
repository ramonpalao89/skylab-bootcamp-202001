const { validate } = require('modum-utils')
const { models: { User, Album } } = require('modum-data')
const { NotFoundError, NotAllowedError } = require('modum-errors')

module.exports = (idUser, idAlbum) => {

    validate.string(idUser, 'idUser')

    return (async () => {
        const user = await User.findById(idUser)
        if (!user) throw new NotFoundError(`User with id ${idUser} not found`)

        let { cart } = user

        for (let i = 0; i < cart.length; i++) {
            
            if(cart[i].album.toString() === idAlbum){
                cart.splice(cart[i], 1)
            }
            
        }

        user.save()

        return
    })()
}