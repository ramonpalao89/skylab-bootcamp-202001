import React, { useEffect, useState } from 'react'
import { retrieveShoppingCart } from '../logic'
import './Shopping-cart.sass'

export default ({ albums, totalPay }) => {
    let { name, year, artists, quantity, priceVinyl, priceDigital, portrait, id } = albums
    const [_priceVinyl, setPriceVinyl] = useState(priceVinyl)
    const [_priceDigital, setPriceDigital] = useState(priceDigital)


    // const [albums, setAlbums] = useState([])

    // useEffect(() => {
    //     (async () => {

    //         const albums = await retrieveShoppingCart()
    //         setAlbums(albums)

    //     })()
    // }, [])

    const handleShowPriceVinyl = () => {
        // debugger
        setPriceDigital(undefined)
        setPriceVinyl(priceVinyl)
        
    }

    const handleShowPriceDigital = () => {
        setPriceVinyl(undefined)
        setPriceDigital(priceDigital)

    }


    return <div>
        <section class="buy">
            <section>
                <section class="buy__display">
                    <img src={portrait} class="buy__pic" />
                    <section class="buy__info">
                        <p class="buy__album">{name} ({year})</p>
                        <p class="buy__artist">{artists[0].name}</p>
                        {/* <section class="buy__quantity">
                            <input list="quantity" name="quantity" class="buy__quantity-input" />
                            <p> QTY.</p>
                            <datalist id="quantity">
                                <option value="1" />
                                <option value="2" />
                                <option value="3" />
                                <option value="4" />
                                <option value="5" />
                            </datalist>
                        </section> */}
                    </section>
                    <section class="buy__buy">
                        <button class="buy__button" onClick={event => {
                            event.preventDefault()
                            handleShowPriceVinyl()
                        }}>BUY VINYL ALBUM</button>
                        <button class="buy__button" onClick={event => {
                            event.preventDefault()
                            handleShowPriceDigital()
                        }}>BUY DIGITAL VERSION</button>
                        {_priceVinyl ? <span class="buy__price"> Vinyl: {priceVinyl} €</span> : ''}
                        {_priceDigital ? <span class="buy__price"> Digital: {priceDigital} €</span> : ''}
                    </section>
                </section><br />
            </section>
        </section>
    </div>
}