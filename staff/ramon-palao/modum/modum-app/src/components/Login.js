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
            <form onSubmit={event => {
                event.preventDefault()

                const email = event.target.email.value
                const password = event.target.password.value

                onLogin(email, password)
            }}>
                <h1>Login</h1>
                <input type="text" name="email" placeholder="Enter your email" ref={inputText} />
                <input type="password" name="password" placeholder="Enter your password" />
                <button type="submit">LOGIN</button>
                <a href="" onClick={event => {
                    event.preventDefault()
                    onGoToRegister()
                }}>Don't you have an account? Go to Register</a>
            </form>
            {error && <Feedback message={error} level="error" />}
        </div>
    </div>
}