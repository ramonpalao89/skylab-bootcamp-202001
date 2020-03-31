import { validate } from 'modum-utils'
const { NotFoundError } = require('modum-errors')

const API_URL = process.env.REACT_APP_API_URL

export default (function (idArtist) {

    return fetch(`${API_URL}/all-songs/${idArtist}`, {
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
                const songs = response.json()

                return songs
            }
        })
})
