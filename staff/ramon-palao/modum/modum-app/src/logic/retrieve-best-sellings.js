const { NotFoundError } = require('modum-errors')

const API_URL = process.env.REACT_APP_API_URL

export default (function () {
    let albums

    return fetch(`${API_URL}/best-sellings`, {
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
                const bestAlbums = response.json()
                albums = bestAlbums
                return albums
            }
        })
        .then(albums => {

            albums.forEach((album) => album.portrait = `${API_URL}/portrait/${album.id}`)
            return albums
        })
})
