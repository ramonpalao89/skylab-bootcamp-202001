import React, { useState, useEffect } from 'react'
import ShoppingCart from './Shopping-cart'
import './Shopping-cart.sass'
import Feedback from './Feedback'
import { retrieveShoppingCart } from '../logic'

export default ({ onGoToPay, onToDelete }) => {

    const [totalPay, setTotal] = useState(0)
    const [cartItems, setCartItems] = useState([])
    const [error, setError] = useState(undefined)

    useEffect(() => {
        (async () => {
            try {
                const cartItems = await retrieveShoppingCart()
                setCartItems(cartItems)
                const totalPay = cartItems.reduce(function(sum, album){
                    return sum + album.priceDigital + album.priceVinyl
                }, 0)
                
                setTotal(totalPay)

            } catch (error) {
                setError(error)

                setTimeout(() => {
                    setError(undefined)
                }, 3000)
            }
        })()

    }, [cartItems])

    return <section className="buy-background">
        {error && <Feedback message={error} level='error' />}

        <h1 class="buy__title"><i class="fas fa-shopping-cart"></i> My Shopping List:</h1><br />
        {!cartItems.length && <h2>No products added to your Shopping List</h2>}

        {cartItems.map((item, index) => <ShoppingCart key={index} cartItems={item} onToDelete={onToDelete} />)}

        <section class="buy__total">
            <h3 class="buy__total-price">Total ({cartItems.length} products) : {totalPay} €</h3>
            <section class="buy__total-card">
                <button class="buy__total__pay" onClick={event => {
                    event.preventDefault()
                    onGoToPay(totalPay, cartItems)
                }}><i class="far fa-credit-card"></i> PAY NOW</button>
            </section>
        </section>
    </section>
}