import React from 'react'
import './Playlist.sass'

export default ({songsPlaylist, onTrackedSong}) => {
    const { song, name, artists } = songsPlaylist

    return <div>

        <section class="playlist__group">
            <section class="playlist__songs">
                <section>
                    <i class="fas fa-play-circle" onClick={event => {
                        event.preventDefault()
                        onTrackedSong(song.id)
                    }}></i>
                </section>
                <section>
                    <p>{song.name}</p>
                </section>
                <section>
                    <p>{artists[0].name}</p>
                </section>
                <section>
                    <p>{name}</p>
                </section>
                <section>
                    <p>03:00</p>
                </section>
                {/* <section>
                {<audio src={song.file} controls autoPlay='true'></audio>}
                </section> */}
            </section>
        </section>
    </div>
}