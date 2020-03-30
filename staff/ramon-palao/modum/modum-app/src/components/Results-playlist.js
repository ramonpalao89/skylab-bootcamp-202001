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
        (async() => {
            try{
                const songsPlaylist = await retrievePlaylist()
                setSongsPlaylist(songsPlaylist)

            } catch({message}){
                setState({...state, error: message})

                setTimeout(() => {
                    setState({error: undefined})
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
        {error && <Feedback message={error} level='error'/>}
        <section class="playlist-main">
            <section class="playlist__display-pic">
                <section class="">
                    <img class="playlist__pic" src="bob.jpeg" />
                    <img class="playlist__pic" src="bob.jpeg" />
                </section>
                <section class="">
                    <img class="playlist__pic" src="bob.jpeg" />
                    <img class="playlist__pic" src="bob.jpeg" />
                </section>
            </section>
            <section class="playlist__display-name">
                <h1 class="playlist__name">PLAYLIST</h1>
            </section>
        </section>
        <section class="playlist__detail">
            <section class="playlist__categories">
                <p class="playlist__title">TITLE</p>
                <p class="playlist__artist">ARTIST</p>
                <p class="playlist__album">ALBUM</p>
                <p class="playlist__time"><i class="far fa-clock"></i></p>
            </section>
        </section>
        {songsPlaylist.map((song, index) => <Playlist key={index} songsPlaylist={song} onTrackedSong={handleRetrieveSong}/>)}
        <audio src={file} controls autoPlay='true'></audio>
    </div>
}