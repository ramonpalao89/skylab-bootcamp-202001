import React, { useRef } from 'react'
import './Best-sellings.sass'
import Feedback from './Feedback'

export default ({bestSellings, onAddToCart, error, message}) => {
    const {name, portrait, artists, year, genre, priceDigital, priceVinyl, id} = bestSellings
    const showAlbum = useRef()

    const handleOpenModule = () => {
        showAlbum.current.className = 'overlay active'
    }

    const handleCloseModule = () => {
        showAlbum.current.className = 'overlay'
    }


    return <section>
        <section class="best-selling">
            <section class="best-selling__display">
                <img src={portrait} class="best-selling__pic" />
                <section class="best-selling__info">
                    <p class="best-selling__artist">{artists[0].name}</p>
                    <p class="best-selling__album">{name} ({year})</p>
                </section>
                <section class="best-selling__buy">
                    <button class="best-selling__button" onClick={event => {
                        event.preventDefault()
                        handleOpenModule()
                    }}><i className='fas fa-shopping-cart'></i></button>
                </section>
            </section><br />
        </section>
        <section className="overlay" ref={showAlbum}>
            <div className="popup">
                <a href='#' onClick={event => {
                    event.preventDefault()
                    handleCloseModule()
                }} className='btn-close-popup'><i className='fas fa-times'></i></a>
                <h3>{name} ({year})</h3>
                <h5>{artists[0].name}</h5>
                <img src={portrait} className='popup-image'/>
                <p>{genre}</p>
                <span>Vinyl Edition: {priceVinyl} €</span>
                <button onClick={event => {
                    event.preventDefault()
                    onAddToCart(id, 'vinyl')
                }}><i className='fas fa-shopping-cart'></i></button>
                <span>Digital Version: {priceDigital} €</span>
                <button onClick={event => {
                    event.preventDefault()
                    onAddToCart(id, 'digital')
                }}><i className='fas fa-shopping-cart'></i></button>
                {message && <Feedback message={message} level='info' />}
                {error && <Feedback message={error} level='error' />}
            </div>
        </section>
    </section>
}