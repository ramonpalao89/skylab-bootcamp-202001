import React from 'react'
import Feedback from './Feedback'
import './Register.sass'

export default ({ onRegister, onGoToLogin, error, onMount }) => {

    return <div className="register-slider">
        <div className="register-load">
        </div>
        <div className="register-content">
            <div className="register-principal">
                <h1>MODUM</h1>
                <p>You are what you listen to</p>
            </div>
            <div className="register__form">
            <form onSubmit={event => {
                event.preventDefault()

                const name = event.target.name.value
                const surname = event.target.surname.value
                const email = event.target.email.value
                const password = event.target.password.value

                onRegister(name, surname, email, password)
            }}>
                <h1>Sign-Up</h1>
                <div className="register__form-inputs">
                <div className="register__form-names">
                <input className="register__form-name" type="text" name="name" placeholder="Enter your name" />
                <input className="register__form-surname" type="text" name="surname" placeholder="Enter your surname" />
                </div>
                <div className="register__form-credentials">
                <input className="register__form-email" type="text" name="email" placeholder="Enter your email address" />
                <input className="register__form-password" type="password" name="password" placeholder="Enter your password" />
                </div>
                </div>
                <div className="register__form-buttons">
                <button className="register__form-submit" type="submit">REGISTER</button>
                <a href="" onClick={event => {
                    event.preventDefault()
                    onGoToLogin()
                }}>Already registered? Go to Login</a>
                </div>
            </form>
            {error && <Feedback message={error} level='error' />}
            </div>
        </div>
    </div>
}