import React, { useEffect, useState } from 'react'
import { isLoggedIn, retrieveGenreHome } from '../logic'
import Item from './Item'
import './Results-item.sass'

export default ({onAddToCart, message}) => {

    const [albums, setAlbums] = useState([])
    const [error, setError] = useState(undefined)

    useEffect(() => {
        if (isLoggedIn()) {
            (async () => {
                try {

                    const albums = await retrieveGenreHome()

                    setAlbums(albums)

                } catch (error) {
                    setError(error)

                }
            })()
        } else {

        }
    }, [])

    return <div className='landing__pop'>

        {albums.map((album, index) => <Item key={index} albums={album} onAddToCart={onAddToCart} message={message} error={error} />)}

    </div>
}