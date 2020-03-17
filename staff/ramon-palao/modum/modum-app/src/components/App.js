import React, {useState, useEffect} from 'react';
import './App.sass';

function App({name}) {
  const [view, setView] = useState()

  return <div className="App">
    <h1>Hello {name}</h1>

    {/* {view === 'register' && <Register onRegister={handleRegister} setView={setView} />}
    {view === 'login' && <Login onLogin={handleLogin} setView={setView} />}
    {view === 'landing' && <Landing user={user} onGoToLastEvents={handleRetrieveLastEvents} />}
    {view === 'lastEvents' && <ResultLastEvents lastEvents={lastEvents} setView={setView} />} */}
  </div>
}

export default App;
