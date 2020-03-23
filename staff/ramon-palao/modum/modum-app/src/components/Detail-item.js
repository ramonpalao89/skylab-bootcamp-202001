import React, { useState, useEffect } from 'react'
// import { retrieveAlbumDetail, isLoggedIn } from '../logic'
import './Detail-item.sass'

export default ({ albumDetail, onTrackedSong, file }) => {
    // debugger

    // let [albumDetail, setAlbumDetail] = useState()
    // useEffect(() => {
    //     if (isLoggedIn()) {
    //       (async() => {

    //         const albumDetail = await retrieveAlbumDetail(id)
    //         debugger
    //         setAlbumDetail(albumDetail)

    //     })()
    // }
    // })

    const { artists, songs, name, genre, year, priceVinyl, priceDigital, portrait, id } = albumDetail

    return <section className="album-background">
        <section className="album-titles">
            <section>
                <h2 className="album-name">{name} ({year})</h2><br />
                <h2 className="album-artist">{artists ? artists[0].name : 'Artist name not found'}</h2><br />
                <h3 className="album-genre">{genre}</h3>
            </section>
            {/* <section>
                <h2 className="album-rating">Rating: 9/10</h2>
            </section> */}
        </section>
        <section className="album-detail">
            <section>
                <img src={portrait} />
            </section>
            <section className="album-songs">
                <section className='album-songs__title'>
                    {songs && songs.map(song => <p className='album-songs__name' onClick={event => {
                        event.preventDefault()
                        onTrackedSong(song.id)
                    }}>{song.name}</p>)}
                </section>
                <section className='album-songs__audio'>
                    {songs && <audio src={file} controls autoplay='true'></audio>}
                </section>
            </section>
        </section>
    </section>
}
