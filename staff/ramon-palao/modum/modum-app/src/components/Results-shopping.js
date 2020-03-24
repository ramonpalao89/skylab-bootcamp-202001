import React from 'react'
import ShoppingCart from './Shopping-cart'
import './Shopping-cart.sass'
import Feedback from './Feedback'

export default ({ albums, error, onGoToPay }) => {

    return <section className="buy-background">
        {error && <Feedback message={error} level='error'/>}

        <h1 class="buy__title"><i class="fas fa-shopping-cart"></i> My Shopping List:</h1><br />
        {!albums && <h2>No products added to your Shopping List</h2>}

        {albums.map((album, index) => <ShoppingCart key={index} albums={album} />)}

        <section class="buy__total">
            <h3 class="buy__total-price">Total ({albums.length} products) : {(function handleTotalPrice(){
                return albums.reduce(function(sum, album){
                    // debugger
                    return sum + Number.parseFloat(album.priceDigital) + Number.parseFloat(album.priceVinyl)
                    
                }, 0)
            })()} €</h3>
            <section class="buy__total-card">
                <button class="buy__total__pay" onClick={event => {
                    event.preventDefault()
                    onGoToPay()
                }}><i class="far fa-credit-card"></i> PAY NOW</button>
            </section>
        </section>
    </section>
}