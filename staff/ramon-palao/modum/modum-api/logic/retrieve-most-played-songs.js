const { validate } = require('modum-utils')
const { models: { User } } = require('modum-data')
const { NotFoundError, NotAllowedError } = require('modum-errors')

module.exports = id => {
    validate.string(id, 'id')
    const playedSongs = []

    return User.findById(id)
        .then(user => {
            if (!user) throw new NotFoundError(`user with id ${id} does not exist`)

            if (user.deactivated) throw new NotAllowedError(`user with id ${id} is deactivated`)

            const { mostPlayedSongs } = user

            mostPlayedSongs.sort((a, b) => b.value - a.value)

            mostPlayedSongs.forEach(item => playedSongs.push(item))

            return playedSongs
        })
        .then(playedSongs => playedSongs)
}