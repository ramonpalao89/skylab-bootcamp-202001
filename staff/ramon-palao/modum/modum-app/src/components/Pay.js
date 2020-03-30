import React, { useContext, useState, useEffect, useRef } from 'react'
import './Pay.sass'
import { retrieveShippingDetails, retrieveCreditCards } from '../logic'
import Feedback from './Feedback'

export default ({ cartItems, totalPay, onShipping, message, onPurchased }) => {
    const postShipping = useRef()
    const showShipping = useRef()
    const showCreditCards = useRef()
    const cardForm = useRef()
    const loading = useRef()
    const completed = useRef()
    const [shippingDetails, setShipping] = useState([])
    const [error, setError] = useState(undefined)
    const [creditCards, setCards] = useState(undefined)
    const [newMessage, setMessage] = useState()
    const [data, setData] = useState({
        cardholder: '',
        number: '',
        date: '',
        ccv: ''
    })

    useEffect(() => {
        (async () => {
            try {
                const shippingDetails = await retrieveShippingDetails()
                setShipping(shippingDetails)

                cartItems.forEach(item =>{
                    if(item.priceVinyl){
                        
                        if (!shippingDetails.length) {
                            postShipping.current.className = 'overlay active'
                        } else {
                            showShipping.current.className = 'overlay active'
                        }
                    }
                })

            } catch (error) {
                setError(error)

                setTimeout(() => {
                    setError(undefined)
                }, 3000)
            }
        })()
    }, [])

    const handleInputChange = (event) => {
        console.log(event.target.value)
        setData({
            ...data,
            [event.target.name] : event.target.value,
        })

    }

    const handleCloseShippingModule = () => {
        showShipping.current.className = 'overlay'
    }

    const handleCloseModule = () => {
        postShipping.current.className = 'overlay'
        completed.current.className = 'overlay'
    }

    const handleCloseCardDetailsModule = () => {
        showCreditCards.current.className = 'overlay'
    }

    const handleSelectCard = (name, number, expiration) => {
        cardForm.current.cardholder.value = name
        cardForm.current.number.value = number
        cardForm.current.date.value = expiration
    }

    const handleRetrieveCards = () => {
        (async () => {
            try {
                const creditCards = await retrieveCreditCards()
                setCards(creditCards)
                if (!creditCards.length) {
                    setMessage('You don\'t have any Credit Card saved. You can store your Credit Cards on your profile')

                    setTimeout(() => {
                        setMessage(undefined)
                    }, 5000)
                } else {
                    showCreditCards.current.className = 'overlay active'
                }
            } catch (error) {
                setError(error)

                setTimeout(() => {
                    setError(undefined)
                }, 3000)
            }
        })()
    }

    const handleShowLoading = () => {
        loading.current.className = 'dot-container active'

        setTimeout(() => {
            loading.current.className = 'dot-container'
            completed.current.className = 'overlay active'
        }, 3000)
    }

    return <div className='card-background'>
        <h1 class="card__title"><i class="far fa-credit-card"></i> Complete your purchase:</h1>
        <h3>TOTAL TO PAY: {totalPay} €</h3>
        <a href='' onClick={event => {
            event.preventDefault()
            handleRetrieveCards()
        }}>Would you like to use any of your credit cards?</a>
        {newMessage && <Feedback message={newMessage} level='error' />}
        <section class="card__display">
            <section class="card__border">
                <section class="card__logo">
                    <i class="fab fa-cc-visa"></i>
                </section>
                <section class="card__details">
                    <section class="card__numbers-display">
                        <h3 class="card__numbers">{data.number}</h3>
                    </section>
                    <section class="card__date-display">
                        <p class="card__date">{data.date}</p>
                    </section>
                    <h3 class="card__name">{data.cardholder}</h3>
                </section>
            </section>
        </section>
        <form class="card__form" ref={cardForm}>
            <input type="text" name="cardholder" placeholder="CARDHOLDER NAME" class="card__input" onChange={handleInputChange} />
            <input type="text" name="number" placeholder="CARD NUMBER" class="card__input" onChange={handleInputChange} />
            <input type="text" name="date" placeholder="EXPIRED DATE" class="card__input" onChange={handleInputChange} />
            <input type="password" name="ccv" placeholder="CCV NUMBER" class="card__input" onChange={handleInputChange} />
        <div className='dot-container' ref={loading}>
            <span></span>
            <span></span>
            <span></span>
        </div>
        <section class="card__button-display">
            <button type="submit" class="card__button" onClick={event => {
                event.preventDefault()
                handleShowLoading()
            }}><i class="far fa-credit-card"></i> PAY NOW</button>
        </section>
        </form>
        <section className="overlay" ref={postShipping}>
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
                    {message && <Feedback message={message} level='info' />}
                    {error && <Feedback message={error} level='error' />}
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
                {shippingDetails && shippingDetails.map(detail => <button onClick={event => {
                    event.preventDefault()
                    handleCloseShippingModule()
                }}>Select</button>)}
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
                {creditCards && creditCards.map(detail => <button onClick={event => {
                    event.preventDefault()
                    handleSelectCard(detail.name, detail.number, detail.expiration)
                    handleCloseCardDetailsModule()
                }}>Select</button>)}
            </div>
        </section>
        <section className="overlay" ref={completed}>
            <div className="popup">
                <a href='#' onClick={event => {
                    event.preventDefault()
                    handleCloseModule()
                }} className='btn-close-popup'><i className='fas fa-times'></i></a>
                <h3>PURCHASED COMPLETED!</h3>
                <h5>Thanks for shopping. You can enjoy now your digital albums on 'My Modum' section.</h5>
                <button className='btn-submit' onClick={event => {
                    event.preventDefault()
                    onPurchased()
                }}>Accept</button>
            </div>
        </section>
    </div>
}