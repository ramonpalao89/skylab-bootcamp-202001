import React from 'react'
import Feedback from './Feedback'

export default ({onRegister, onGoToLogin, error, onMount}) =>{

    return <div>
        <form onSubmit={event =>{
            event.preventDefault()

            const name = event.target.name.value
            const surname = event.target.surname.value
            const email = event.target.email.value
            const password = event.target.password.value

            onRegister(name, surname, email, password)
        }}>
        <h1>Sign-Up</h1>
        <input type="text" name="name" placeholder="Enter your name"/>
        <input type="text" name="surname" placeholder="Enter your surname"/>
        <input type="text" name="email" placeholder="Enter your email address"/>
        <input type="password" name="password" placeholder="Enter your password"/>
        <button type="submit">REGISTER</button>
        <a href="" onClick={event => {
            event.preventDefault()
            onGoToLogin()
        }}>Already registered? Go to Login</a>
        </form>
        {error && <Feedback message={error} level='error'/>}
    </div>
}