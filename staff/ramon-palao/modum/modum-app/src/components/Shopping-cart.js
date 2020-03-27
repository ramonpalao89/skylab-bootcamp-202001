import React from 'react'
import './Shopping-cart.sass'

export default ({ cartItems }) => {
    const {format, priceDigital, priceVinyl, portrait, name, year} = cartItems

    return <div>
        <section class="buy">
            <section>
                <section class="buy__display">
                    <img src={portrait} class="buy__pic" />
                    <section class="buy__info">
                        <p class="buy__album">{name} ({year})</p>
                    </section>
                    <section>
                        <p>Version: {format}</p>
                        <p>Price: {priceDigital ? priceDigital : priceVinyl} €</p>
                    </section>
                </section><br />
            </section>
        </section>
    </div>
}