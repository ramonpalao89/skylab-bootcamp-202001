import React, { useState, useEffect, useContext } from 'react';
import './App.sass';
import { Register, Login, Page, Home, Header, ResultsItem, DetailItem, ResultsBestSellings, Profile, ResultsShopping, Pay } from '../components'
import { registerUser, login, isLoggedIn, retrieveUser, retrieveGenre, retrieveAlbumDetail, retrieveYear, retrieveBestSellings, updateProfile, retrieveSong, updateShoppingCart, retrieveShoppingCart } from '../logic'
import { Context } from './ContextProvider'
import { Route, withRouter, Redirect } from 'react-router-dom'

export default withRouter(function ({ history }) {

  const [state, setState] = useContext(Context)
  const [user, setUser] = useState([])
  const [albums, setAlbums] = useState([])
  const [albumDetail, setAlbumDetail] = useState([])
  const [bestSellings, setBestSellings] = useState([])
  let [message, setMessage] = useState([])
  const [file, setFile] = useState([])

  useEffect(() => {
    if (isLoggedIn()) {
      (async () => {
        try {
          const user = await retrieveUser()
          setUser(user)
        } catch (error) {
          // logout()
          history.push('/login')
        }
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

        let user = await retrieveUser()

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
      try {
        const albums = await retrieveGenre(genre)

        setAlbums(albums)

        history.push('/albums/genre')

      } catch ({ message }) {
        setState({ ...state, error: message })

        setTimeout(() => {
          setState({ error: undefined })
        }, 3000)
      }
    })()
  }

  const handleRetrieveYear = year => {
    (async () => {
      try {
        const albums = await retrieveYear(year)

        setAlbums(albums)

        history.push('/albums/year')

      } catch ({ message }) {
        setState({ ...state, error: message })

        setTimeout(() => {
          setState({ error: undefined })
        }, 3000)

      }
    })()
  }

  const handleRetrieveBestSellings = () => {
    (async () => {
      try {
        const bestSellings = await retrieveBestSellings()

        setBestSellings(bestSellings)

        history.push('/albums/best-sellings')

      } catch ({ message }) {
        setState({ ...state, error: message })

        setTimeout(() => {
          setState({ error: undefined })
        }, 3000)
      }
    })()
  }

  const handleDetail = id => {
    (async () => {
      try {
        const albumDetail = await retrieveAlbumDetail(id)

        setAlbumDetail(albumDetail)

        history.push(`/album/detail/`)

      } catch ({ message }) {
        setState({ ...state, error: message })

        setTimeout(() => {
          setState({ error: undefined })
        }, 3000)
      }
    })()
  }

  const handleProfile = (newUser) => {
    (async () => {
      try {
        await updateProfile(newUser)

        setUser(newUser)

        setMessage('Updated Succesfully!')

        setTimeout(() => {
          setMessage(undefined)
        }, 3000)

        history.push('/user/profile')

      } catch ({ message }) {
        setState({ ...state, error: message })

        setTimeout(() => {
          setState({ error: undefined })
        }, 3000)
      }
    })()
  }

  const handleRetrieveSong = idSong => {
    (async () => {
      try {
        const file = await retrieveSong(idSong)
        setFile(file)

      } catch ({ message }) {
        setState({ ...state, error: message })

        setTimeout(() => {
          setState({ error: undefined })
        }, 3000)

      }
    })()
  }

  const handleAddToCart = (id) => {
    (async () => {
      try {
        await updateShoppingCart(id)
        setMessage('Album added to your shopping list')

        setTimeout(() => {
          setMessage(undefined)
        }, 3000)
      } catch ({ error }) {
        setState({ ...state, error: message })

        setTimeout(() => {
          setState({ error: undefined })
        }, 3000)
      }
    })()
  }

  const handleRetrieveShoppingCart = () => {
    (async () => {
      try {
        const albums = await retrieveShoppingCart()
        setAlbums(albums)
        history.push('/shopping-cart')
      } catch ({ message }) {
        setState({...state, error:message})

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

  const handleGoToProfile = () => {
    history.push('/user/profile')
  }

  const handleGoToPay = () => {
    history.push('/payment')
  }


  const { error } = state

  return <div className="App">
    <Route exact path='/' render={() => isLoggedIn() ? <Redirect to='/home' /> : <Redirect to='/login' />} />
    <Route path='/register' render={() => isLoggedIn() ? <Redirect to='/home' /> : <Register onRegister={handleRegister} onGoToLogin={handleGoToLogin} error={error} />} />
    <Route path='/login' render={() => isLoggedIn() ? <Redirect to='/home' /> : <Login onLogin={handleLogin} onGoToRegister={handleGoToRegister} error={error} />} />
    <Route path='/home' render={() => isLoggedIn() ? <><Header onGoToShoppingCart={handleRetrieveShoppingCart} onGoToProfile={handleGoToProfile} user={user} genreButtonClick={handleRetrieveGenre} yearButtonClick={handleRetrieveYear} bestSellingsButtonClick={handleRetrieveBestSellings} /><Home /></> : <Redirect to='/login' />} />
    <Route path='/albums/genre' render={() => isLoggedIn() ? <><Header onGoToShoppingCart={handleRetrieveShoppingCart} onGoToProfile={handleGoToProfile} user={user} genreButtonClick={handleRetrieveGenre} yearButtonClick={handleRetrieveYear} bestSellingsButtonClick={handleRetrieveBestSellings} /><ResultsItem albums={albums} onGoToDetail={handleDetail} /></> : <Redirect to='/login' />} />
    <Route path='/albums/year' render={() => isLoggedIn() ? <><Header onGoToShoppingCart={handleRetrieveShoppingCart} onGoToProfile={handleGoToProfile} user={user} genreButtonClick={handleRetrieveGenre} yearButtonClick={handleRetrieveYear} bestSellingsButtonClick={handleRetrieveBestSellings} /><ResultsItem albums={albums} onGoToDetail={handleDetail} /></> : <Redirect to='/login' />} />
    <Route path='/album/detail/' render={props => isLoggedIn() ? <><Header onGoToShoppingCart={handleRetrieveShoppingCart} onGoToProfile={handleGoToProfile} user={user} genreButtonClick={handleRetrieveGenre} yearButtonClick={handleRetrieveYear} bestSellingsButtonClick={handleRetrieveBestSellings} /><DetailItem albumDetail={albumDetail} id={props.match.params.id} onTrackedSong={handleRetrieveSong} file={file} onAddToCart={handleAddToCart} message={message} error={error} /></> : <Redirect to='/login' />} />
    <Route path='/albums/best-sellings/' render={() => isLoggedIn() ? <><Header onGoToShoppingCart={handleRetrieveShoppingCart} onGoToProfile={handleGoToProfile} user={user} genreButtonClick={handleRetrieveGenre} yearButtonClick={handleRetrieveYear} bestSellingsButtonClick={handleRetrieveBestSellings} /><ResultsBestSellings bestSellings={bestSellings} onGoToDetail={handleDetail} /></> : <Redirect to='/login' />} />
    <Route path='/user/profile/' render={() => isLoggedIn() ? <><Header onGoToShoppingCart={handleRetrieveShoppingCart} onGoToProfile={handleGoToProfile} user={user} genreButtonClick={handleRetrieveGenre} yearButtonClick={handleRetrieveYear} bestSellingsButtonClick={handleRetrieveBestSellings} /><Profile onSubmit={handleProfile} user={user} error={error} message={message} /></> : <Redirect to='/login' />} />
    <Route path='/shopping-cart' render={() => isLoggedIn() ? <><Header onGoToShoppingCart={handleRetrieveShoppingCart} onGoToProfile={handleGoToProfile} user={user} genreButtonClick={handleRetrieveGenre} yearButtonClick={handleRetrieveYear} bestSellingsButtonClick={handleRetrieveBestSellings} /><ResultsShopping albums={albums} error={error} onGoToPay={handleGoToPay} /></> : <Redirect to='/login' />} />
    <Route path='/payment' render={() => isLoggedIn() ? <><Header onGoToShoppingCart={handleRetrieveShoppingCart} onGoToProfile={handleGoToProfile} user={user} genreButtonClick={handleRetrieveGenre} yearButtonClick={handleRetrieveYear} bestSellingsButtonClick={handleRetrieveBestSellings} /><Pay /></> : <Redirect to='/login' />} />

  </div>
})
