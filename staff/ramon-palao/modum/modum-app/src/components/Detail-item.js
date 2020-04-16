import React, { useState, useEffect } from 'react'
import { retrieveAlbumDetail, retrieveAllSongs, retrieveUser } from '../logic'
import './Detail-item.sass'

export default ({ idAlbum, onTrackedSong, file, addToPlaylist }) => {

    const [album, setAlbum] = useState([])
    const [songsArtist, setSongsArtist] = useState([])
    const [user, setUser] = useState([])

    useEffect(() => {
        (async () => {

            const album = await retrieveAlbumDetail(idAlbum)

            const { artists } = album

            setAlbum(album)

            const songsArtist = await retrieveAllSongs(artists[0].id)

            setSongsArtist(songsArtist)

            const user = await retrieveUser()

            setUser(user)


        })()

    }, [songsArtist])


    const { artists, songs, name, genre, year, portrait, id } = album
    const { playlist } = user

    return <section className='play-album__background'>
        <section className="play-album-titles">
            <h2 className="play-album-name">{artists && artists[0].name}</h2><br />
            <h2 className="play-album-artist">{name} ({year})</h2><br />
        </section>
        <section className="play-album-detail">
            <section>
                <img className="play-album__pic" src={portrait} />
            </section>
            <section className="play-album-songs">
                {songsArtist && playlist && songsArtist.map(song => <p><i className={`far fa-star${playlist.some(item => item.song === song._id) ? ' favourite' : ''} `} title='Add to Playlist' onClickCapture={event => {
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
