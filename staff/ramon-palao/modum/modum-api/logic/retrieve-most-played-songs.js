const { validate } = require('modum-utils')
const { models: { User } } = require('modum-data')
const { NotFoundError, NotAllowedError } = require('modum-errors')

module.exports = id => {
    validate.string(id, 'id')
    const playedSongs = []

    return User.findById(id).lean()
        .then(user => {
            if (!user) throw new NotFoundError(`user with id ${id} does not exist`)

            if (user.deactivated) throw new NotAllowedError(`user with id ${id} is deactivated`)

            const { mostPlayedSongs } = user

            mostPlayedSongs.sort((a, b) => b.value - a.value)

            if (mostPlayedSongs.length) {

                mostPlayedSongs.forEach(item => playedSongs.length < 5 ? playedSongs.push(item) : '')

                playedSongs.forEach(item => {
                    item.id = item._id.toString()
                    delete item._id
                })
            }

            return playedSongs
        })
        .then(playedSongs => playedSongs)
}