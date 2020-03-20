import { validate } from 'modum-utils'
const { NotFoundError } = require('modum-errors')

const API_URL = process.env.REACT_APP_API_URL

export default (function (genre) {
    validate.string(genre, 'genre')
    let albums

    return fetch(`${API_URL}/album/genre/${genre}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
        .then(response => {

            const { status } = response

            if (status >= 400 && status < 500) {

                const { error } = response.json()

                if (status === 404) {
                    throw new NotFoundError(error)
                }

                throw new Error(error)

            }

            if (status === 200) {
                const albumsGenre = response.json()
                albums = albumsGenre
                return albums
            }
        })
        .then(albums => {

            albums.forEach((album) => album.portrait = `${API_URL}/portrait/${album.id}`)
            return albums
        })
})
