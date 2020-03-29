const { validate } = require('modum-utils')
const { models: { User } } = require('modum-data')
const { NotFoundError, NotAllowedError } = require('modum-errors')

module.exports = id => {
    validate.string(id, 'id')

    return User.findById(id).lean()
        .then(user => {
            if (!user) throw new NotFoundError(`user with id ${id} does not exist`)

            if (user.deactivated) throw new NotAllowedError(`user with id ${id} is deactivated`)

            
            // user.mostPlayedSongs.forEach(item => {
            //     item.id = item._id.toString()
                
            //     delete item._id
            // })
            
            // user.mostPlayedArtists.forEach(item => {
            //     item.id = item._id.toString()
                
            //     delete item._id
            // })
            
            // user.creditCards.forEach(item => {
            //     item.id = item._id.toString()
                
            //     delete item._id
            // })
            
            // user.shippingInformation.forEach(item => {
            //     item.id = item._id.toString()
                
            //     delete item._id
            // })
            
            // user.id = user._id.toString()
            // delete user._id
            // delete user.__v
            
            user.retrieved = new Date
            // user.save()
            
            return user
        })
}