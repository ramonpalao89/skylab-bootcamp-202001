const { validate } = require('modum-utils')
const { models: { User, Album } } = require('modum-data')
const { NotFoundError, NotAllowedError } = require('modum-errors')

module.exports = (idUser) => {

    validate.string(idUser, 'idUser')

    return (async () => {
        const user = await User.findById(idUser)
        if (!user) throw new NotFoundError(`User with id ${idUser} not found`)

        let { chart, purchasedAlbums} = user

        if(chart.length){
            for(let i = 0; i < chart.length; i++){
                const album = await Album.findById(chart[i]).populate('artists', 'name')
                let { buyers } = album
                buyers.push(idUser)
                purchasedAlbums.push(album)
                album.save()
            }
        } else {
            throw new NotAllowedError('Chart is empty')
        }

        chart.splice(0, chart.length)
        user.save()

        return
    })()
}