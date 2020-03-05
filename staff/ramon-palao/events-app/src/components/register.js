import React from 'react'

export default ({ onRegister, setView }) => {
    return <div>
        <form onSubmit={event => {
            event.preventDefault()

            const name = event.target.name.value
            const surname = event.target.surname.value
            const email = event.target.email.value
            const password = event.target.password.value

            onRegister(name, surname, email, password)
        }}>
            <h2>SIGN-UP</h2>
            <input type="text" name="name" placeholder="Name" />
            <input type="text" name="surname" placeholder="Surname" />
            <input type="text" name="email" placeholder="Email" />
            <input type="password" name="password" placeholder="Password" />
            <button type="submit">REGISTER</button>
        </form>
        <a href='' onClick={event => {
            event.preventDefault()
            setView('login')
        }}>Go To Login</a>
    </div>
}
