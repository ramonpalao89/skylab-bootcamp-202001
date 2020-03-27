const { validate } = require('modum-utils')
const { models: { Album, User, CartItem } } = require('modum-data')
const { NotFoundError } = require('modum-errors')

module.exports = id => {
    validate.string(id, 'id')

    return (async () => {
        const user = await User.findById(id)
        if (!user) throw new NotFoundError(`User with id ${id} not found`)

        const { cart } = user
        const cartList = []

        if(cart.length){
            for(let i = 0; i < cart.length; i++){
                const album = await Album.findById(cart[i].album).populate('artists', 'name')
                const element = {}
                element.priceDigital = album.priceDigital
                element.priceVinyl = album.priceVinyl
                element.format = cart[i].format
                element.portrait = album.portrait
                element.name = album.name
                element.year = album.year
                element.genre = album.genre
                element.id = album.id
                element.songs = album.songs
                element.artists = album.artists
                element.buyers = album.buyers

                cartList.push(element)
            }
        }

        return cartList
    })()
}