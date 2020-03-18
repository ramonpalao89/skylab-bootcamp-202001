import React, { useState, useEffect, useContext } from 'react';
import './App.sass';
import { Register, Login } from '../components'
import { registerUser, login } from '../logic'
import { Context} from './ContextProvider'

function App({ name }) {
  const [view, setView] = useState('register')
  const [state, setState] = useContext(Context)

  const handleRegister = (name, surname, email, password) => {
    (async () => {

      try {
        await registerUser(name, surname, email, password)
        setView('login')

      } catch ({message}) {
        setState({error: message})
      }
    })()
  }

  const handleLogin = (email, password) => {
    (async () => {
      try {
        const token = await login(email, password)
        setView('login')
      } catch (error) {
        console.log(error)
      }
    })()
  }

  return <div className="App">
    <h1>Hello {name}</h1>

    {view === 'register' && <Register onRegister={handleRegister} setView={setView} />}
    {view === 'login' && <Login onLogin={handleLogin} setView={setView} />}
    {/* {view === 'register' && <Register onRegister={handleRegister} setView={setView} />}
    {view === 'login' && <Login onLogin={handleLogin} setView={setView} />}
    {view === 'landing' && <Landing user={user} onGoToLastEvents={handleRetrieveLastEvents} />}
    {view === 'lastEvents' && <ResultLastEvents lastEvents={lastEvents} setView={setView} />} */}
  </div>
}

export default App;
