import React, { useEffect, useState, useContext } from 'react'
import Playlist from './Playlist'
import './Playlist.sass'
import { retrieveSong, retrievePlaylist } from '../logic'
import { Context } from './ContextProvider'
import Feedback from './Feedback'

export default () => {
    const [file, setFile] = useState([])
    const [songsPlaylist, setSongsPlaylist] = useState([])
    const [state, setState] = useContext(Context)

    useEffect(() => {
        (async () => {
            try {
                const songsPlaylist = await retrievePlaylist()
                setSongsPlaylist(songsPlaylist)

            } catch ({ message }) {
                setState({ ...state, error: message })

                setTimeout(() => {
                    setState({ error: undefined })
                }, 3000)
            }
        })()

    }, [])

    const handleRetrieveSong = idSong => {
        (async () => {
            try {
                const file = await retrieveSong(idSong)
                setFile(file)

            } catch ({ message }) {
                setState({ ...state, error: message })

                setTimeout(() => {
                    setState({ error: undefined })
                }, 3000)

            }
        })()
    }

    const { error } = state

    return <div>
        {error && <Feedback message={error} level='error' />}
        <section className="playlist-main">
            <section className="playlist__display-pic">
            </section>
            <section className="playlist__display-name">
                <h1 className="playlist__name">PLAYLIST</h1>
            </section>
        </section>
        <section className="playlist__detail">
            <section className="playlist__categories">
                <p className="playlist__title">TITLE</p>
                <p className="playlist__artist">ARTIST</p>
                <p className="playlist__album">ALBUM</p>
            </section>
        </section>
        <section className='playlist-container'>
            {songsPlaylist.map((song, index) => <Playlist key={index} songsPlaylist={song} onTrackedSong={handleRetrieveSong} />)}
        </section>
        <section className='playlist__audio'>
            <audio src={file} controls autoPlay='true'></audio>
        </section>
    </div>
}