import context from './context'
const { NotFoundError } = require('modum-errors')

const API_URL = process.env.REACT_APP_API_URL

export default (function () {

    return (async () => {
        const response = await fetch(`${API_URL}/most-played-artists`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.token }
        })

        const { status } = response

        if (status >= 400 && status < 500) {

            const { error } = await response.json()

            if (status === 404) {
                throw new NotFoundError(error)
            }

            throw new Error(error)

        }

        if (status === 200) {
            const artists = await response.json()

            if(artists.length){

                const idArtist = artists[0].subject
    
                const res = await fetch(`${API_URL}/artist/${idArtist}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                })
    
                if (status === 200) {
                    const artist = await res.json()
                    let { portrait } = artist
                    let [id,] = portrait.split('.')
                    artist.portrait = `${API_URL}/portrait/${id}`
                    return artist
                }
            } else {
                return
            }
        }
    })()

}).bind(context)
