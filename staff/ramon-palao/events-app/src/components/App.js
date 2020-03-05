import React, { useState, useEffect } from 'react'
import logo from './logo.svg'
// import './App.css'
import './App.sass'
import { registerUser, authenticateUser } from '../logic'
import { Register, Login } from '../components'

function App({ name }) {
  const [view, setView] = useState('register')

  const handleRegister = (name, surname, email, password) => {

    (async => {
      try {
        await registerUser(name, surname, email, password)
        setView('login')

        console.log("USER REGISTERED")

      } catch (error) {
        console.log(error.message)
      }
    })()
  }

  const handleLogin = (email, password) => {

    (async () => {
      try {
        const token = await authenticateUser(email, password)
        sessionStorage.token = token
        setView('login')
      } catch (error) {
        console.log(error.message)
      }
    })()
  }



  const handleGoToRegister = () => {
    setView('register')
  }

  const handleGoToLogin = () => {
    setView('login')
  }

  return <div className="App">

    {view === 'register' && <Register onRegister={handleRegister} onGoToLogin={handleGoToLogin} />}
    {view === 'login' && <Login onLogin={handleLogin} onGoToRegister={handleGoToRegister} />}
  </div>
}

export default App
