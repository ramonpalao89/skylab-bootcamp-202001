import context from './context'
const { NotFoundError } = require('modum-errors')

const API_URL = process.env.REACT_APP_API_URL

export default (function () {
    const mostPlayedSongs = []

    return (async () => {

        const response = await fetch(`${API_URL}/most-played-songs`, {
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
            const songs = await response.json()

            if (songs.length) {

                let idSong = songs[0].subject
                let res = await fetch(`${API_URL}/track-name/${idSong}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                })

                if (status === 200) {
                    let song = await res.json()
                    mostPlayedSongs.push(song)
                }

                idSong = songs[1].subject
                res = await fetch(`${API_URL}/track-name/${idSong}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                })

                if (status === 200) {
                    let song = await res.json()
                    mostPlayedSongs.push(song)
                }

                idSong = songs[2].subject
                res = await fetch(`${API_URL}/track-name/${idSong}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                })

                if (status === 200) {
                    let song = await res.json()
                    mostPlayedSongs.push(song)
                }

                idSong = songs[3].subject
                res = await fetch(`${API_URL}/track-name/${idSong}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                })

                if (status === 200) {
                    let song = await res.json()
                    mostPlayedSongs.push(song)
                }

                idSong = songs[4].subject
                res = await fetch(`${API_URL}/track-name/${idSong}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                })

                if (status === 200) {
                    let song = await res.json()
                    mostPlayedSongs.push(song)
                }
            }

            return mostPlayedSongs
        }
    })()
}).bind(context)
