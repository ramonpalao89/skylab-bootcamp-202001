import React from 'react'
import './Shopping-cart.sass'

export default ({ cartItems, onToDelete }) => {
    const {format, priceDigital, priceVinyl, portrait, name, year, id} = cartItems

    return <div>
        <section class="buy">
            {/* <section> */}
                <section class="buy__display">
                    <a href='' onClick={event => {
                        event.preventDefault()
                        onToDelete(id)
                    }}><i className='fas fa-trash-alt'></i></a>
                    <img src={portrait} class="buy__pic" />
                    <section class="buy__info">
                        <p class="buy__album">{name} ({year})</p>
                    </section>
                    <section>
                        <p>Version: {format}</p>
                        <p>Price: {priceDigital ? priceDigital : priceVinyl} €</p>
                    </section>
                </section><br />
            {/* </section> */}
        </section>
    </div>
}