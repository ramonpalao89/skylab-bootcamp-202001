import React from 'react'
import Item from './Item'
// import './Results-item.sass'

export default ({albumsGenre, onGoToDetail}) => {

    return <section className="landing__pop">
        {albumsGenre.map((album, index) => <Item key={index} albumsGenre={album} onGoToDetail={onGoToDetail}/>)}
    </section>

}