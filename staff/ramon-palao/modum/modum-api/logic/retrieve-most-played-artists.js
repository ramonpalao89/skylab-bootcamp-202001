const { validate } = require('modum-utils')
const { models: { User } } = require('modum-data')
const { NotFoundError, NotAllowedError } = require('modum-errors')

module.exports = id => {
    validate.string(id, 'id')
    const playedArtists = []

    return User.findById(id).lean()
        .then(user => {
            if (!user) throw new NotFoundError(`user with id ${id} does not exist`)

            if (user.deactivated) throw new NotAllowedError(`user with id ${id} is deactivated`)

            const { mostPlayedArtists } = user

            mostPlayedArtists.sort((a, b) => b.value - a.value)

            if (mostPlayedArtists.length) {

                playedArtists.push(mostPlayedArtists[0])

                playedArtists.forEach(item => {
                    item.id = item._id.toString()
                    delete item._id
                })
            }


            // if (!playedArtists.length) throw new NotFoundError(`user with id ${id} has not played any artist yet`)

            return playedArtists
        })
        .then(playedArtists => playedArtists)
}