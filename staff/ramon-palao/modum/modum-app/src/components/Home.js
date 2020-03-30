import React, { useEffect, useState, useContext } from 'react'
import { isLoggedIn, retrieveGenreHome } from '../logic'
import { Context } from './ContextProvider'
import Feedback from './Feedback'
import Item from './Item'
import './Results-item.sass'

export default () => {

    const [set, setState] = useContext(Context)
    const [albums, setAlbums] = useState([])

    useEffect(() => {
        if (isLoggedIn()) {
            (async () => {
                try {

                    const albums = await retrieveGenreHome()

                    setAlbums(albums)

                } catch (error) {
                    setState({ error: error.message })

                }
            })()
        } else {

        }
    }, [])



    const { error } = set
    return <div className='landing__pop'>
        {error && <Feedback message={error} level="error" />}

        {albums.map((album, index) => <Item key={index} albums={album} />)}

    </div>
}