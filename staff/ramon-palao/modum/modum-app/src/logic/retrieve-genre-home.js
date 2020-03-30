import { validate } from 'modum-utils'
const { NotFoundError } = require('modum-errors')

const API_URL = process.env.REACT_APP_API_URL

export default (function () {
    let allAlbums = []

    return fetch(`${API_URL}/all-albums`, {
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
                const albums = response.json()

                return albums
            }
        })
        .then(albums => {

            albums.forEach((album) => album.portrait = `${API_URL}/portrait/${album._id}`)
            return albums
        })
        .then(albums => {
            for(let i = 0; i < 12; i++){
                let validValues = albums.filter(item => !allAlbums.includes(item))
                let random = Math.floor(Math.random() * validValues.length)
                allAlbums.push(validValues[random])
            }
            return allAlbums
        })
})
