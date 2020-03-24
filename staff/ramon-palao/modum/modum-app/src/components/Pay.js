import React from 'react'
import './Pay.sass'

export default () => {

    return <div className='card-background'>
        <h1 class="card__title"><i class="far fa-credit-card"></i> Complete your purchase:</h1>
        <section class="card__display">
            <section class="card__border">
                <section class="card__logo">
                    <i class="fab fa-cc-visa"></i>
                </section>
                <section class="card__details">
                    <section class="card__numbers-display">
                        <h3 class="card__numbers">1234 1234 1234 1234</h3>
                    </section>
                    <section class="card__date-display">
                        <p class="card__date">EXP. 12/21</p>
                    </section>
                    <h3 class="card__name">RAMON PALAO PALAZON</h3>
                </section>
            </section>    
        </section>
        <form class="card__form">
            <input type="text" name="cardholder" placeholder="CARDHOLDER NAME" class="card__input"/>
            <input type="text" name="number" placeholder="CARD NUMBER" class="card__input"/>
            <input type="text" name="date" placeholder="EXPIRED DATE" class="card__input"/>
            <input type="text" name="ccv" placeholder="CCV NUMBER" class="card__input"/>
        </form>
        <section class="card__button-display">
            <button class="card__button"><i class="far fa-credit-card"></i> PAY NOW</button>
        </section>
    </div>
}