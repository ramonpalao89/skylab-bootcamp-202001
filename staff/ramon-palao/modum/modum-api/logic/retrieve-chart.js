const { validate } = require('modum-utils')
const { models: { Album, User } } = require('modum-data')
const { NotFoundError } = require('modum-errors')

module.exports = id => {
    validate.string(id, 'id')

    return (async () => {
        const user = await User.findById(id)
        if (!user) throw new NotFoundError(`User with id ${id} not found`)

        const { chart } = user
        const chartList = []

        if(chart.length){
            for(let i = 0; i < chart.length; i++){
                const album = await Album.findById(chart[i]).populate('artists', 'name')
                chartList.push(album)
            }
        } else {
            throw new NotFoundError('No products in chart')
        }

        return chartList
    })()
}