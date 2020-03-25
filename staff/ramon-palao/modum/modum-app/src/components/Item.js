import React, {useRef} from 'react'
import './Item.sass'
import Feedback from './Feedback'

export default ({albums, onAddToCart, message, error}) => {
    const {name, priceVinyl, priceDigital, portrait, artists, genre, year, id} = albums
    const showAlbum = useRef()

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
            }}/>
                <section className="landing__details">
                    <h3>{name}</h3>
                    <h4>{artists[0].name}</h4>
                    {/* <span>{priceVinyl}</span>
                    <button className="landing__button" onClick={event => {
                        event.preventDefault()
                        onGoToDetail(id)
                    }}>BUY IT</button> */}
                </section>
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
                    onAddToCart(id)
                    
                }}><i className='fas fa-shopping-cart'></i></button>
                <span>Digital Version: {priceDigital} €</span>
                <button onClick={event => {
                    event.preventDefault()
                    onAddToCart(id)
                }}><i className='fas fa-shopping-cart'></i></button>
                {message && <Feedback message={message} level='info' />}
                {error && <Feedback message={error} level='error' />}
            </div>
        </section>
    </div>
}