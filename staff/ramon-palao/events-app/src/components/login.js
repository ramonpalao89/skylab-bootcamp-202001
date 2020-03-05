import React from 'react'

export default function ({ setView, onLogin }) {
    return <div>
        <form onSubmit={(event => {
            event.preventDefault()

            const email = event.target.email.value
            const password = event.target.password.value

            onLogin(email, password)
        })}>
            <h2>LOGIN</h2>
            <input type="text" name="email" placeholder="Enter your email" />
            <input type="password" name="password" placeholder="Enter your password" />
            <button type="submit">LOGIN</button>
        </form>
        <a href="" onClick={event => {
            event.preventDefault()
            setView('register')
        }}>Go to Register</a>
    </div>
}