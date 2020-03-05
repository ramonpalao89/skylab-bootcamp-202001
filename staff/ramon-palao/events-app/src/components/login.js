import React from 'react'

export default function({onGoToRegister, onLogin}){
    return <form onSubmit={(event => {
        event.preventDefault()

        const email = event.target.email.value
        const password = event.target.password.value

        onLogin(email, password)
    })}>
        <h2>LOGIN</h2>
        <input type="text" name="email" placeholder="Enter your email"/>
        <input type="password" name="password" placeholder="Enter your password"/>
        <button type="submit">LOGIN</button>
        <a href="" onClick={event => {
            event.preventDefault()
            onGoToRegister()
        }}>Go to Register</a>
    </form>
}