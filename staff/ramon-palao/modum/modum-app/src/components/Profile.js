import React, { useEffect, useState, useRef } from 'react'
import './Profile.sass'
import Feedback from './Feedback'
import { retrieveMostPlayedSongs, retrieveMostPlayedArtist, retrievePurchasedAlbums } from '../logic'

export default ({ onSubmit, user, error, message, onShipping, onShippingDetails, shippingDetails, onSaveCard, onCardDetails, creditCards }) => {

    const [mostPlayedSongs, setMostPlayedSongs] = useState(null)
    const [mostPlayedArtist, setMostPlayedArtist] = useState(null)
    const [purchasedAlbums, setPurchased] = useState(null)
    const overlayClassName = useRef()
    const showShipping = useRef()
    const saveCreditCard = useRef()
    const showCreditCards = useRef()

    useEffect(() => {
        (async () => {

            const mostPlayedSongs = await retrieveMostPlayedSongs()

            setMostPlayedSongs(mostPlayedSongs)

            const mostPlayedArtist = await retrieveMostPlayedArtist()

            setMostPlayedArtist(mostPlayedArtist)

            const purchasedAlbums = await retrievePurchasedAlbums()

            setPurchased(purchasedAlbums)

        })()
    }, [])

    const handleOpenModule = () => {
        overlayClassName.current.className = 'overlay active'
    }

    const handleCloseModule = () => {
        overlayClassName.current.className = 'overlay'
    }

    const handleOpenShippingModule = () => {
        showShipping.current.className = 'overlay active'
    }

    const handleCloseShippingModule = () => {
        showShipping.current.className = 'overlay'
    }

    const handleOpenCardModule = () => {
        saveCreditCard.current.className = 'overlay active'
    }

    const handleCloseCardModule = () => {
        saveCreditCard.current.className = 'overlay'
    }

    const handleOpenCardDetailsModule = () => {
        showCreditCards.current.className = 'overlay active'
    }

    const handleCloseCardDetailsModule = () => {
        showCreditCards.current.className = 'overlay'
    }

    return <section className="profile-detail">
        <section className="profile-detail__user">
            <h1 className="profile-detail__name">{user.name} {user.surname}</h1>
            <img src="" className="profile-detail__avatar" />
            <form className="profile-detail__form" onSubmit={event => {
                event.preventDefault()

                let name = event.target.name.value
                let surname = event.target.surname.value
                let email = event.target.email.value
                let city = event.target.city.value
                let birth = event.target.birth.value
                let password = event.target.password.value
                let newPassword = event.target.newPassword.value

                let newUser = { name, surname, email, city, birth, password, newPassword }

                onSubmit(newUser)

            }}>
                <input type="text" name="name" defaultValue={user.name} placeholder="Enter your name" /><br />
                <input type="text" name="surname" defaultValue={user.surname} placeholder="Enter your surname" /><br />
                <input type="text" name="email" defaultValue={user.email} placeholder="Enter your email" /><br />
                <input type="text" name="city" defaultValue={user.city} placeholder="Enter your city" /><br />
                <input type="text" name="birth" defaultValue={user.birth} placeholder="Enter your date of birth (dd/mm/yyyy)" /><br />
                <p>Do you want to change your password??</p><br />
                <input type="password" name="password" placeholder="Enter your old password" /><br />
                <input type="password" name="newPassword" placeholder="Enter your new password" /><br />
                <button>UPDATE YOUR PROFILE</button><br />
            </form>
            {error && <Feedback message={error} level="error" />}
            {message && <Feedback message={message} level="info" />}
        </section>
        <section className="profile-detail__info">
            <h1 className="profile-detail__title"><i className="fas fa-award"></i> Most Listened SONGS:</h1>
            <section className="profile-detail__listened">
                {mostPlayedSongs && mostPlayedSongs.map(song => <p className="profile-detail__song">{song[1].name} - {song[0].name}</p>)}
            </section>
            <section className="profile-detail__fav-artist"><br />
                <h1 className="profile-detail__artist"><i className="fas fa-trophy"></i> Most Listened ARTIST:</h1><br />
                {mostPlayedArtist && <h2 className="profile-detail__artist-name">{mostPlayedArtist.artists[0].name}</h2>}<br />
                {mostPlayedArtist && <img src={mostPlayedArtist.portrait} className="profile-detail__artist-pic" />}
            </section><br />
            <section className="profile-detail__purchased"><br />
                <h1 className="profile-detail__purchased-list"><i className="fas fa-shopping-cart"></i> Purchased ALBUMS:</h1><br />
                <section className="profile-detail__purchased-albums">
                    <section>
                        {purchasedAlbums && purchasedAlbums.map(album => <img src={album.portrait} alt={album.name} className='profile-detail__purchased-pic' />)}
                    </section>
                </section>
            </section>
        </section>
        <section>
            <button onClick={event => {
                event.preventDefault()
                handleOpenModule()
            }}>Add Shipping Details</button>
        </section>
        <section>
            <button onClick={event => {
                event.preventDefault()
                handleOpenShippingModule()
                onShippingDetails()
            }}>See your Shipping Details</button>
        </section>
        <section>
            <button onClick={event => {
                event.preventDefault()
                handleOpenCardModule()
            }}>Add Credit Card Details</button>
        </section>
        <section>
            <button onClick={event => {
                event.preventDefault()
                handleOpenCardDetailsModule()
                onCardDetails()
            }}>See your Credit Cards</button>
        </section>
        <section className="overlay" ref={overlayClassName}>
            <div className="popup">
                <a href='#' onClick={event => {
                    event.preventDefault()
                    handleCloseModule()
                }} className='btn-close-popup'><i className='fas fa-times'></i></a>
                <h3>Shipping Details</h3>
                <h5>Give us your address details to send your shopping as soon as possible</h5>
                <form onSubmit={event => {
                        event.preventDefault()

                        const customerName = event.target.customerName.value
                        const address = event.target.address.value
                        const city = event.target.city.value
                        const country = event.target.country.value
                        const phoneNumber = event.target.phoneNumber.value

                        onShipping(customerName, address, city, country, phoneNumber)
                    }}>
                    <div className='inputs-container'>
                        <input type="text" name="customerName" placeholder="Enter your full name" />
                        <input type="text" name="address" placeholder="Enter your street address" />
                        <input type="text" name="city" placeholder="Enter your city" />
                        <input type="text" name="country" placeholder="Enter your country" />
                        <input type="text" name="phoneNumber" placeholder="Enter your phone number" />
                    </div>
                    <button type='submit' className='btn-submit'>Accept</button>
                    {message && <Feedback message={message} level='info'/>}
                    {error && <Feedback message={error} level='error'/>}
                </form>
            </div>
        </section>
        <section className="overlay" ref={showShipping}>
            <div className="popup">
                <a href='#' onClick={event => {
                    event.preventDefault()
                    handleCloseShippingModule()
                }} className='btn-close-popup'><i className='fas fa-times'></i></a>
                <h3>My Shipping Details</h3>
                {shippingDetails && shippingDetails.map(detail => <p>{detail.customerName}</p>)}
                {shippingDetails && shippingDetails.map(detail => <p>{detail.streetAddress}</p>)}
                {shippingDetails && shippingDetails.map(detail => <p>{detail.city}</p>)}
                {shippingDetails && shippingDetails.map(detail => <p>{detail.country}</p>)}
                {shippingDetails && shippingDetails.map(detail => <p>{detail.phoneNumber}</p>)}
            </div>
        </section>
        <section className="overlay" ref={saveCreditCard}>
            <div className="popup">
                <a href='#' onClick={event => {
                    event.preventDefault()
                    handleCloseCardModule()
                }} className='btn-close-popup'><i className='fas fa-times'></i></a>
                <h3>Credit Card Details</h3>
                <h5>Save your credit card details:</h5>
                <form onSubmit={event => {
                        event.preventDefault()

                        const issuer = event.target.issuer.value
                        const name = event.target.name.value
                        const number = event.target.number.value
                        const expiration = event.target.expiration.value
                        const cvv = event.target.cvv.value

                        onSaveCard(issuer, name, number, expiration, cvv)
                    }}>
                    <div className='inputs-container'>
                        <input type="text" name="issuer" placeholder="Issuer (Mastercard, Visa, ...)" />
                        <input type="text" name="name" placeholder="Cardholder Name" />
                        <input type="text" name="number" placeholder="Card Number" />
                        <input type="text" name="expiration" placeholder="Expiration date (yy - mm)" />
                        <input type="password" name="cvv" placeholder="CVV (3 digits)" />
                    </div>
                    <button type='submit' className='btn-submit'>Accept</button>
                    {message && <Feedback message={message} level='info'/>}
                    {error && <Feedback message={error} level='error'/>}
                </form>
            </div>
        </section>
        <section className="overlay" ref={showCreditCards}>
            <div className="popup">
                <a href='#' onClick={event => {
                    event.preventDefault()
                    handleCloseCardDetailsModule()
                }} className='btn-close-popup'><i className='fas fa-times'></i></a>
                <h3>My Credit Cards</h3>
                {creditCards && creditCards.map(detail => <p>{detail.issuer}</p>)}
                {creditCards && creditCards.map(detail => <p>{detail.name}</p>)}
                {creditCards && creditCards.map(detail => <p>{detail.number}</p>)}
                {creditCards && creditCards.map(detail => <p>{detail.expiration}</p>)}
                {creditCards && creditCards.map(detail => <p>{detail.cvv}</p>)}
            </div>
        </section>
    </section>
}