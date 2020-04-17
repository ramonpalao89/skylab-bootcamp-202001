import React from 'react'
import './Playlist.sass'

export default ({songsPlaylist, onTrackedSong}) => {
    const { song, name, artists } = songsPlaylist

    return <section className="playlist__group">
                <section className="playlist__songs">
                    <section className='playlist__container-song'>
                        <i className="fas fa-play-circle" onClick={event => {
                            event.preventDefault()
                            onTrackedSong(song.id)
                        }}></i>
                    </section>
                    <section className='playlist__container-song'>
                        <p className = "playlist__text">{song.name}</p>
                    </section>

                    <section className='playlist__container-song'>
                        <p>{artists[0].name}</p>
                    </section>
                    
                    <section className='playlist__container-song'>
                        <p>{name}</p>
                    </section>
                </section>
        </section>
}