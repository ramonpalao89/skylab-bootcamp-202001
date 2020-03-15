const { validate } = require('modum-utils')
const { models: { User } } = require('modum-data')
const { NotFoundError, NotAllowedError } = require('modum-errors')

module.exports = id => {
    validate.string(id, 'id')

    return User.findById(id)
        .then(user => {
            if (!user) throw new NotFoundError(`user with id ${id} does not exist`)

            if (user.deactivated) throw new NotAllowedError(`user with id ${id} is deactivated`)

            user.retrieved = new Date

            user.save()

            return user
        })
        // .then(({ name, surname, email, purchasedAlbums, mostPlayedSongs, favSong }) => ({ name, surname, email, purchasedAlbums, mostPlayedSongs, favSong }))
}