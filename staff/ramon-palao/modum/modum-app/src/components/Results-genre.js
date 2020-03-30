import React, { useEffect, useState } from 'react'
import Item from './Item'
import './Results-item.sass'
import { retrieveGenre } from '../logic'

export default ({ genre, onAddToCart, message, error }) => {
    const [albums, setAlbums] = useState([])

    useEffect(() => {
        (async () => {

            const albums = await retrieveGenre(genre)
            setAlbums(albums)

        })()
    }, [genre])

    return <section className="landing__pop">
        {albums.map((album, index) => <Item key={index} albums={album} onAddToCart={onAddToCart} message={message} error={error} />)}
    </section>

}