import React, { useEffect, useState } from 'react'
import Item from './Item'
import './Results-item.sass'
import { retrieveYear } from '../logic'

export default ({ year, onAddToCart, message, error }) => {
    const [albums, setAlbums] = useState([])

    useEffect(() => {
        (async () => {

            const albums = await retrieveYear(year)
            setAlbums(albums)

        })()
    }, [year])

    return <section className="landing__pop">
        {albums.map((album, index) => <Item key={index} albums={album} onAddToCart={onAddToCart} message={message} error={error} />)}
    </section>

}