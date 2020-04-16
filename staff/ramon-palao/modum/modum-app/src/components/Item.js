import React, { useRef, useEffect, useState } from 'react'
import './Item.sass'
import Feedback from './Feedback'
import { retrievePurchasedAlbums } from '../logic'

export default ({ albums, onAddToCart, message, error }) => {
    const { name, priceVinyl, priceDigital, portrait, artists, genre, year, id } = albums
    const showAlbum = useRef()
    const digital = useRef()
    const purchased = useRef()

    useEffect(() => {
        (async () => {
            try {
                const purchasedAlbums = await retrievePurchasedAlbums()

                purchasedAlbums.forEach(item => {
                    if (item.format === 'digital' && item.id === albums.id) {
                        digital.current.className = 'hide'
                        purchased.current.className = 'popup-purchased'
                    } else {
                        digital.current.className = ''
                    }
                })

            } catch (error) {
                console.log(error)
            }
        })()
    }, [])

    const handleOpenModule = () => {
        showAlbum.current.className = 'overlay active'
    }

    const handleCloseModule = () => {
        showAlbum.current.className = 'overlay'
    }

    return <div>
        <section className="landing__section">
            <img src={portrait} className="landing__album-picture" onClick={event => {
                event.preventDefault()
                handleOpenModule()
            }} />
            <section className="landing__details">
                <h3>{name}</h3>
                <h4>{artists[0].name}</h4>
            </section>
        </section>
        <section className="overlay" ref={showAlbum}>
            <div className="popup__album">
                <a href='#' onClick={event => {
                    event.preventDefault()
                    handleCloseModule()
                }} className='btn-close-popup'><i className='fas fa-times'></i></a>
                <h3>{name} ({year})</h3>
                <h5>{artists[0].name}</h5>
                <img src={portrait} className='popup-image' />
                <p>{genre}</p>
                <span>Vinyl Edition: {priceVinyl} €</span>
                <button onClick={event => {
                    event.preventDefault()
                    onAddToCart(id, 'vinyl')
                }}><i className='fas fa-shopping-cart'></i></button>
                <section className='' ref={digital}>
                    <span>Digital Version: {priceDigital} €</span>
                    <button onClick={event => {
                        event.preventDefault()
                        onAddToCart(id, 'digital')
                    }}><i className='fas fa-shopping-cart'></i></button>
                </section>
                <section>
                    <p ref={purchased} className='popup-purchased hide'>Digital Version: PURCHASED</p>
                </section>
                {message && <Feedback message={message} level='info' />}
                {error && <Feedback message={error} level='error' />}
            </div>
        </section>
    </div>
}