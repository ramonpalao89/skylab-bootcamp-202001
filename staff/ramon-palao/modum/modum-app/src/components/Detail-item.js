import React, { useState, useEffect, useRef } from 'react'
import { retrieveAlbumDetail, retrieveAllSongs } from '../logic'
import './Detail-item.sass'
import Feedback from './Feedback'

export default ({ idAlbum, onTrackedSong, file, addToPlaylist, message, error }) => {

    const [album, setAlbum] = useState([])
    const [songsArtist, setSongsArtist] = useState([])

    useEffect(() => {
        (async () => {

            const album = await retrieveAlbumDetail(idAlbum)

            const { artists } = album

            setAlbum(album)

            const songsArtist = await retrieveAllSongs(artists[0].id)

            setSongsArtist(songsArtist)


        })()

    }, [songsArtist])


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
                {songsArtist && songsArtist.map(song => <p><i className={`far fa-star${song.isFav ? ' favourite' : ''} `} title='Add to Playlist' onClickCapture={event => {
                    event.stopPropagation()
                    addToPlaylist(song._id)
                }}></i> <i className="fas fa-play-circle" onClick={event => {
                    event.preventDefault()
                    onTrackedSong(song._id)
                }}></i>{song.name}</p>)}
            </section>
            <section>
                {songs && <audio src={file} controls autoPlay={true}></audio>}
            </section>
        </section>
    </section>
}
