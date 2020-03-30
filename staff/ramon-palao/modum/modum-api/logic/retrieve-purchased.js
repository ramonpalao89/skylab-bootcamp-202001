const { validate } = require('modum-utils')
const { models: { Album, User } } = require('modum-data')
const { NotFoundError } = require('modum-errors')

module.exports = id => {
    validate.string(id, 'id')

    return (async () => {
        const user = await User.findById(id)
        if (!user) throw new NotFoundError(`User with id ${id} not found`)

        const { purchasedAlbums } = user
        const purchasedList = []

        if(purchasedAlbums.length){
            for(let i = 0; i < purchasedAlbums.length; i++){
                const album = await Album.findById(purchasedAlbums[i].album).populate('artists', 'name').lean()
                
                album.artists[0].id = album.artists[0]._id.toString()
                delete album.artists[0]._id
                
                purchasedList.push(album)
                purchasedAlbums[i].format === 'digital' ? purchasedList[purchasedList.length -1].format = 'digital' : purchasedList[purchasedList.length -1].format = 'vinyl'
            }
        }

        purchasedList.forEach(item => {
            item.id = item._id.toString()
    
            delete item._id
            delete item.__v
        })

        return purchasedList
    })()
}