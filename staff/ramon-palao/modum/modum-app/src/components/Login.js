import React from 'react'

export default ({onLogin, setView}) => {
    return <div>
        <form onSubmit={event => {
            event.preventDefault()

            const email = event.target.email.value
            const password = event.target.password.value

            onLogin(email, password)
        }}>
            <h1>Login</h1>
            <input type="text" name="email" placeholder="Enter your email"/>
            <input type="password" name="password" placeholder="Enter your password"/>
            <button type="submit">LOGIN</button>
            <a href="" onClick={event => {
                event.preventDefault()

                setView('register')
            }}>Don't you have an account? Go to Register</a>
        </form>
    </div>
}