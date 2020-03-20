import React, { useState, useEffect, useContext } from 'react';
import './App.sass';
import { Register, Login, Page, Home, Header, ResultsItem, DetailItem } from '../components'
import { registerUser, login, isLoggedIn, retrieveUser, retrieveGenre, retrieveAlbumDetail } from '../logic'
import { Context } from './ContextProvider'
import { Route, withRouter, Redirect } from 'react-router-dom'

export default withRouter(function ({ history }) {

  const [state, setState] = useContext(Context)
  const [user, setUser] = useState([])
  const [albumsGenre, setAlbumsGenre] = useState([])
  const [albumDetail, setAlbumDetail] = useState([])

  useEffect(() => {
    if (isLoggedIn()) {
      (async() => {

        const user = await retrieveUser()
        setUser(user)

        history.push('/home')
      })()
    } else {
      history.push('/login')
    }
  }, [])

  const handleRegister = (name, surname, email, password) => {
    (async () => {

      try {
        await registerUser(name, surname, email, password)
        history.push('/login')

      } catch ({ message }) {
        setState({ error: message })

        setTimeout(() => {
          setState({ error: undefined })
        }, 3000)
      }

    })()
  }

  const handleLogin = (email, password) => {
    (async () => {
      try {
        await login(email, password)

        const user = await retrieveUser()

        setUser(user)

        history.push('/home')

      } catch ({ message }) {
        setState({ ...state, error: message })

        setTimeout(() => {
          setState({ error: undefined })
        }, 3000)
      }
    })()
  }

  const handleRetrieveGenre = genre => {
    (async () => {
      try{
        const albumsGenre = await retrieveGenre(genre)

        setAlbumsGenre(albumsGenre)

        history.push('/albums/genre')

      } catch ({message}) {
        setState({ ...state, error: message})

        setTimeout(() => {
          setState({error: undefined})
        }, 3000)
      }
    })()
  }

  const handleDetail = id => {
    (async () => {
      try{
        const albumDetail = await retrieveAlbumDetail(id)

        setAlbumDetail(albumDetail)

        history.push('/album/detail')

      } catch ({message}) {
        setState({...state, error: message})

        setTimeout(() => {
          setState({error: undefined})
        }, 3000)
      }
    })()
  }

  const handleGoToLogin = () => {
    history.push('/login')
  }

  const handleGoToRegister = () => {
    history.push('/register')
  }


  const { error } = state

  return <div className="App">
    <Route exact path='/' render={() => isLoggedIn() ? <Redirect to='/home' /> : <Redirect to='/login' />} />
    <Route path='/register' render={() => isLoggedIn() ? <Redirect to='/home' /> : <Register onRegister={handleRegister} onGoToLogin={handleGoToLogin} error={error} />} />
    <Route path='/login' render={() => isLoggedIn() ? <Redirect to='/home' /> : <Login onLogin={handleLogin} onGoToRegister={handleGoToRegister} error={error} />} />
    <Route path='/home' render={() => isLoggedIn() ? <><Header user={user} genreButtonClick={handleRetrieveGenre} /><Home /></> : <Redirect to='/login' />} />
    <Route path='/albums/genre' render={() => isLoggedIn() ? <><Header user={user} genreButtonClick={handleRetrieveGenre}/><ResultsItem albumsGenre={albumsGenre} onGoToDetail={handleDetail}/></> : <Redirect to='/login'/>} />
    <Route path='/album/detail' render={() => isLoggedIn() ? <><Header user={user} genreButtonClick={handleRetrieveGenre}/><DetailItem albumDetail={albumDetail}/></> : <Redirect to='/login'/>} />

  </div>
})
