import { validate } from 'modum-utils'
const { NotFoundError } = require('modum-errors')

const API_URL = process.env.REACT_APP_API_URL

export default (id) => {
    validate.string(id, 'id')

    return fetch(`${API_URL}/album/${id}`, {
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
                const album = response.json()
                return album
            }
        })
        .then(album => {
            album.portrait = `${API_URL}/portrait/${album.id}`

            album.forEach((item) => item.portrait = `${API_URL}/portrait/${item.id}`)
            return album
        })
}
