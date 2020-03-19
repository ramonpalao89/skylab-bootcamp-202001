import React, { useEffect, useContext } from 'react'
import Feedback from './Feedback'

export default ({ onLogin, onGoToRegister, error }) => {

    return <div>
        <form onSubmit={event => {
            event.preventDefault()

            const email = event.target.email.value
            const password = event.target.password.value

            onLogin(email, password)
        }}>
            <h1>Login</h1>
            <input type="text" name="email" placeholder="Enter your email" />
            <input type="password" name="password" placeholder="Enter your password" />
            <button type="submit">LOGIN</button>
            <a href="" onClick={event => {
                event.preventDefault()
                onGoToRegister()
            }}>Don't you have an account? Go to Register</a>
        </form>
        {error && <Feedback message={error} level="error"/>}
    </div>
}