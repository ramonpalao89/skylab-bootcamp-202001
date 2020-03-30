import React, { useState, useEffect, useRef } from 'react'
import { retrieveAlbumDetail } from '../logic'
import './Detail-item.sass'
import Feedback from './Feedback'

export default ({ idAlbum, onTrackedSong, file, addToPlaylist, message, error }) => {
    const [album, setAlbum] = useState([])

    useEffect(() => {
        (async () => {

            const album = await retrieveAlbumDetail(idAlbum)
            debugger
            setAlbum(album)

        })()

    }, [])

    const { artists, songs, name, genre, year, portrait, id } = album

    return <section>
        <section className="play-album-titles">
            <h2 className="play-album-name">{artists && artists[0].name}</h2><br />
            <h2 className="play-album-artist">{name} ({year})</h2><br />
        </section>
        <section className="play-album-detail">
            <section>
                <img className="play-album__pic" src={portrait} />
            </section>
            <section className="play-album-songs">
                {songs && songs.map(song => <p><i className={`fas fa-star${song.isFav ? ' favourite' : ''} `} title='Add to Playlist' onClickCapture={event => {
                    event.stopPropagation()
                    addToPlaylist(song.id)
                }}></i> <i className="fas fa-play-circle" onClick={event => {
                    event.preventDefault()
                    onTrackedSong(song.id)
                }}></i>{song.name}</p>)}
            </section>
            <section>
                {songs && <audio src={file} controls autoPlay={true}></audio>}
            </section>
        </section>
    </section>
}
