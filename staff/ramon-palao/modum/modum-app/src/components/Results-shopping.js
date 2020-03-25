import React, { useContext, useState, useEffect } from 'react'
import ShoppingCart from './Shopping-cart'
import './Shopping-cart.sass'
import Feedback from './Feedback'
import { Context } from './ContextProvider'

export default ({ albums, error, onGoToPay }) => {
    // debugger
    // const [state, setState] = useContext(Context)
    const [totalPay, setTotalPay] = useState()

    useEffect(() => {
        (function () {
            try {
                const total = function () {
                    return albums.reduce(function (sum, album) {
                        return sum + album.priceDigital + album.priceVinyl
                    }, 0)
                }
                const totalPay = total
                setTotalPay(totalPay)

            } catch ({ message }) {
                console.log(message)
            }
        })()

    }, [])

    return <section className="buy-background">
        {error && <Feedback message={error} level='error' />}

        <h1 class="buy__title"><i class="fas fa-shopping-cart"></i> My Shopping List:</h1><br />
        {!albums && <h2>No products added to your Shopping List</h2>}

        {albums.map((album, index) => <ShoppingCart key={index} albums={album} totalPay={totalPay}/>)}

        <section class="buy__total">
            <h3 class="buy__total-price">Total ({albums.length} products) : {totalPay} €</h3>
            <section class="buy__total-card">
                <button class="buy__total__pay" onClick={event => {
                    event.preventDefault()
                    onGoToPay(totalPay)
                }}><i class="far fa-credit-card"></i> PAY NOW</button>
            </section>
        </section>
    </section>
}