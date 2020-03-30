import React from 'react'
import './My-albums.sass'

export default ({ digitalPurchased, onGoToDetail }) => {
    const { artists, name, portrait, id } = digitalPurchased
    return <div>
        <section class="my-albums__display">
            <section class="my-albums__section">
                <img src={portrait} class="my-albums__album-picture" />
                <h3>{name}</h3>
                {artists && <h4>{artists[0].name}</h4>}
                <a href="play-albums.html" class="my-albums__play" onClick={event => {
                    event.preventDefault()
                    onGoToDetail(id)
                }}><i class="far fa-play-circle fa-3x"></i></a>
            </section>
        </section>
    </div>
}