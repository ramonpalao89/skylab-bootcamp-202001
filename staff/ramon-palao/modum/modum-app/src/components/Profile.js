import React, { useEffect, useState, useRef } from 'react'
import './Profile.sass'
import Feedback from './Feedback'
import { retrieveMostPlayedSongs, retrieveMostPlayedArtist } from '../logic'

export default ({ onSubmit, user, error, message }) => {

    const [mostPlayedSongs, setMostPlayedSongs] = useState(null)
    const [mostPlayedArtist, setMostPlayedArtist] = useState(null)
    const overlayClassName = useRef()

    useEffect(() => {
        (async () => {

            const mostPlayedSongs = await retrieveMostPlayedSongs()

            setMostPlayedSongs(mostPlayedSongs)

            const mostPlayedArtist = await retrieveMostPlayedArtist()

            setMostPlayedArtist(mostPlayedArtist)
        })()
    }, [])

    const handleOpenModule = () => {
        overlayClassName.current.className = 'overlay active'
    }

    const handleCloseModule = () => {
        overlayClassName.current.className = 'overlay'
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
                        <img src="bob.jpeg" className="profile-detail__purchased-pic" />
                        <p>Bob Marley - Legend</p>
                    </section>
                    <section>
                        <img src="bob.jpeg" className="profile-detail__purchased-pic" />
                        <p>Bob Marley - Legend</p>
                    </section>
                    <section>
                        <img src="bob.jpeg" className="profile-detail__purchased-pic" />
                        <p>Bob Marley - Legend</p>
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
        <section className="overlay" ref={overlayClassName}>
            <div className="popup">
                <a href='#' onClick={event => {
                    event.preventDefault()
                    handleCloseModule()
                }} className='btn-close-popup'><i className='fas fa-times'></i></a>
                <h3>Shipping Details</h3>
                <h5>Give us your address details to send your shopping as soon as possible</h5>
                <form>
                    <div className='inputs-container'>
                        <input type="text" name="customerName" placeholder="Enter your full name" />
                        <input type="text" name="address" placeholder="Enter your street address" />
                        <input type="text" name="city" placeholder="Enter your city" />
                        <input type="text" name="country" placeholder="Enter your country" />
                        <input type="text" name="phoneNumber" placeholder="Enter your phone number" />
                    </div>
                    <button className='btn-submit'>Accept</button>
                </form>
            </div>
        </section>
    </section>
}