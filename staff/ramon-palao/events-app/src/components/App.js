import React, { useState, useEffect } from 'react'
import logo from './logo.svg'
// import './App.css'
import './App.sass'
import { registerUser, sayHello } from '../logic'
import { Register } from '../components'

function App({ name }) {
  const [count, setCount] = useState(0)
  const [view, setView] = useState('register')
  const [hello, setHello] = useState()

  function countUp(event) {
    event.preventDefault()

    setCount(count + 1)
    count > 4 && setView('message')
  }

  useEffect(() => { sayHello(name).then(setHello) }, [])


  function handleRegister(name, surname, email, password) {
    try {
      debugger
      registerUser(name, surname, email, password)
        .then(() => setView('register'))

      console.log("USER REGISTERED")

    } catch (error) {
      console.log(error.message)
    }
  }

  return <div className="App">

    {view === 'register' && <Register onRegister={handleRegister} />}
    <h1>{hello}</h1>
    <form onSubmit={countUp}>
      <span>{count}</span>
      {view === 'message' && <h2>count {count} reached!</h2>}
      <button>++</button>
    </form>
  </div>
}

export default App
