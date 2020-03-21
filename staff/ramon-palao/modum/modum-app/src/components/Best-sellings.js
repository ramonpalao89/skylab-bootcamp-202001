import React from 'react'
import './Best-sellings.sass'

export default ({bestSellings, onGoToDetail}) => {
    const {name, priceVinyl, portrait, artists, year, id} = bestSellings

    return <section>
        <section class="best-selling">
            <section class="best-selling__display">
                <img src={portrait} class="best-selling__pic" />
                <section class="best-selling__info">
                    <p class="best-selling__artist">{artists[0].name}</p>
                    <p class="best-selling__album">{name} ({year})</p>
                </section>
                <section class="best-selling__buy">
                    <span class="best-selling__price">{priceVinyl} €</span>
                    <button class="best-selling__button" onClick={event => {
                        event.preventDefault()
                        onGoToDetail(id)
                    }}>BUY IT</button>
                </section>
            </section><br />
        </section>
    </section>
}