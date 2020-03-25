import React from 'react'
import Item from './Item'
// import './Results-item.sass'

export default ({albums, onAddToCart, message, error}) => {

    return <section className="landing__pop">
        {albums.map((album, index) => <Item key={index} albums={album} onAddToCart={onAddToCart} message={message} error={error}/>)}
    </section>

}