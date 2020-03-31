import React, { useEffect, useContext, useRef } from 'react'
import Feedback from './Feedback'
import './Login.sass'

export default ({ onLogin, onGoToRegister, error }) => {
    const inputText = useRef(null)

    useEffect(() => {
        inputText.current.focus()
    }, [])

    return <div className="login-slider">
        <div className="login-load">
        </div>
        <div className="login-content">
            <div className="login-principal">
                <h1>MODUM</h1>
                <p>You are what you listen to</p>
            </div>
            <div className='login__form'>
                <form onSubmit={event => {
                    event.preventDefault()

                    const email = event.target.email.value
                    const password = event.target.password.value

                    onLogin(email, password)
                }}>
                    <h1>Login</h1>
                    <div className='login__form-inputs'>
                        <input className='login__form-email' type="text" name="email" placeholder="Enter your email" ref={inputText} />
                        <input className='login__form-password' type="password" name="password" placeholder="Enter your password" />
                    </div>
                    <div className='login__form-buttons'>
                        <button className='login__form-submit' type="submit">LOGIN</button>
                        <a className='login__form-anchor' href="" onClick={event => {
                            event.preventDefault()
                            onGoToRegister()
                        }}>Don't you have an account? Go to Register</a>
                    </div>
                </form>
                {error && <Feedback message={error} level="error" />}
            </div>
        </div>
    </div>
}