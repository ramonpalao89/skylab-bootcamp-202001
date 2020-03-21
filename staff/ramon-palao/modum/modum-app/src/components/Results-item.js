import React from 'react'
import Item from './Item'
// import './Results-item.sass'

export default ({albums, onGoToDetail}) => {

    return <section className="landing__pop">
        {albums.map((album, index) => <Item key={index} albums={album} onGoToDetail={onGoToDetail}/>)}
    </section>

}