import React from 'react'
import './My-albums.sass'

export default ({ digitalPurchased, onGoToDetail }) => {
    const { artists, name, portrait, id } = digitalPurchased
    return <section className="my-albums__display">
        <section className="my-albums__section">
            <img src={portrait} className="my-albums__album-picture" />
            <h3>{name}</h3>
            {artists && <h4>{artists[0].name}</h4>}
            <a href="play-albums.html" className="my-albums__play" onClick={event => {
                event.preventDefault()
                onGoToDetail(id)
            }}><i className="far fa-play-circle fa-3x"></i></a>
        </section>
    </section>
}