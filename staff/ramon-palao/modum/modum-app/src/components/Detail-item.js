import React, { useState, useEffect } from 'react'
// import { retrieveAlbumDetail, isLoggedIn } from '../logic'
import './Detail-item.sass'
import Feedback from './Feedback'

export default ({ albumDetail, onTrackedSong, file, message, error }) => {
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

    // return <section className="album-background">
    //     <section className="album-titles">
    //         <section>
    //             <h2 className="album-name">{name} ({year})</h2><br />
    //             <h2 className="album-artist">{artists ? artists[0].name : 'Artist name not found'}</h2><br />
    //             <h3 className="album-genre">{genre}</h3>
    //         </section>
    //         {/* <section>
    //             <h2 className="album-rating">Rating: 9/10</h2>
    //         </section> */}
    //     </section>
    //     <section className="album-detail">
    //         <section>
    //             <img src={portrait} />
    //         </section>
    //         <section className="album-songs">
    //             <section className='album-songs__title'>
    //                 {songs && songs.map(song => <p className='album-songs__name' onClick={event => {
    //                     event.preventDefault()
    //                     onTrackedSong(song.id)
    //                 }}>{song.name}</p>)}
    //             </section>
    //             <section className='album-songs__audio'>
    //                 {songs && <audio src={file} controls autoPlay='true'></audio>}
    //             </section>
    //         </section>
    //     </section>
    //     <button onClick={event => {
    //         event.preventDefault()
    //         onAddToCart(id)
    //     }}>ADD TO CART</button>
    //     {message && <Feedback message={message} level='info'/>}
    //     {error && <Feedback message={error} level='error'/>}
    // </section>
    return <section>
        <section class="play-album-titles">
            <h2 class="play-album-name">{artists && artists[0].name}</h2><br />
            <h2 class="play-album-artist">{name} ({year})</h2><br />
        </section>
        <section class="play-album-detail">
            <section>
                <img class="play-album__pic" src={portrait} />
            </section>
            <section class="play-album-songs">
                {songs && songs.map(song => <p><i class="far fa-star"></i> <i class="fas fa-play-circle" onClick={event => {
                    event.preventDefault()
                    onTrackedSong(song.id)
                }}></i>{song.name}</p>)}
            </section>
            <section>
                {songs && <audio src={file} controls autoPlay='true'></audio>}
            </section>
        </section>
    </section>
}
