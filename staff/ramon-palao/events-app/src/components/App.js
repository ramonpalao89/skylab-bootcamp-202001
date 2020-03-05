import React, { useState, useEffect } from 'react'
import logo from './logo.svg'
// import './App.css'
import './App.sass'
import { registerUser, authenticateUser, retrieveUser, retrieveLastEvents } from '../logic'
import { Register, Login, Landing, ResultLastEvents } from '../components'

function App({ name }) {
  const [view, setView] = useState('register')
  const [user, setUser] = useState()
  const [lastEvents, setLastEvents] = useState()

  const handleRegister = (name, surname, email, password) => {

    (async () => {
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
        const user = await retrieveUser(token)
        setUser(user)
        setView('landing')
      } catch (error) {
        console.log(error.message)
      }
    })()
  }

  const handleRetrieveLastEvents = () => {
      (async () => {
        try {
          const token = sessionStorage.token
          const lastEvents = await retrieveLastEvents(token)
          setLastEvents(lastEvents)
          setView('lastEvents')
        } catch (error) {
          console.log(error.message)
        }
      })()
  }

  useEffect(() => {
    console.log('UPDATED')
  }, [view])

  return <div className="App">

    {view === 'register' && <Register onRegister={handleRegister} setView={setView} />}
    {view === 'login' && <Login onLogin={handleLogin} setView={setView} />}
    {view === 'landing' && <Landing user={user} onGoToLastEvents={handleRetrieveLastEvents} />}
    {view === 'lastEvents' && <ResultLastEvents lastEvents={lastEvents} setView={setView}/>}
  </div>
}

export default App
