import React, { useState, useEffect, useContext } from 'react';
import './App.sass';
import { Register, Login, Home, Header, ResultsItem, DetailItem, ResultsBestSellings, ResultsGenre, Profile, ResultsShopping, Pay, ResultsMyAlbums, ResultsPlaylist, ResultsYear } from '../components'
import { registerUser, login, isLoggedIn, retrieveUser, retrieveGenre, retrieveAlbumDetail, retrieveYear, retrieveBestSellings, updateProfile, retrieveSong, updateShoppingCart, retrieveShoppingCart, postShipping, retrieveShippingDetails, saveCreditCard, retrieveCreditCards, buyProducts, retrievePurchasedAlbums, updatePlaylist, retrievePlaylist, searchArtist, logout, deleteCartItem } from '../logic'
import { Context } from './ContextProvider'
import { Route, withRouter, Redirect } from 'react-router-dom'

export default withRouter(function ({ history }) {

  const [state, setState] = useContext(Context)
  const [user, setUser] = useState([])
  const [albums, setAlbums] = useState([])
  const [albumDetail, setAlbumDetail] = useState([])
  const [bestSellings, setBestSellings] = useState([])
  const [message, setMessage] = useState([])
  const [file, setFile] = useState([])
  const [shippingDetails, setShippingDetails] = useState([])
  const [creditCards, setCreditCards] = useState([])
  const [totalPay, setTotalPay] = useState([])
  const [purchasedAlbums, setPurchased] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [songsPlaylist, setSongsPlaylist] = useState([])

  useEffect(() => {
    if (isLoggedIn()) {
      (async () => {
        try {
          const user = await retrieveUser()
          setUser(user)
        } catch (error) {
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

        history.push(`/albums/genre/${genre}`)

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

        history.push(`/albums/year/${year}`)

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

        history.push(`/album/detail/${id}`)

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

        setMessage('Updated Successfully!')

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

  const handleAddToCart = (id, format) => {
    (async () => {
      try {
        await updateShoppingCart(id, format)
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
        history.push('/shopping-cart')
      } catch ({ message }) {
        setState({ ...state, error: message })

        setTimeout(() => {
          setState({ error: undefined })
        }, 3000)
      }
    })()
  }

  const handlePostShipping = (customerName, address, city, country, phoneNumber) => {
    (async () => {
      try {
        await postShipping(customerName, address, city, country, phoneNumber)
        setMessage('Shipping Information saved successfully!')

        setTimeout(() => {
          setMessage(undefined)
        }, 3000)
      } catch ({ message }) {
        setState({ ...state, error: message })

        setTimeout(() => {
          setState({ error: undefined })
        }, 3000)
      }
    })()
  }

  const handleRetrieveShipping = () => {
    (async () => {
      try {
        const shippingDetails = await retrieveShippingDetails()
        setShippingDetails(shippingDetails)
      } catch ({ message }) {
        setState({ ...state, error: message })

        setTimeout(() => {
          setState({ error: undefined })
        }, 3000)
      }
    })()
  }

  const handleSaveCard = (issuer, name, number, expiration, cvv) => {
    (async () => {
      try {
        await saveCreditCard(issuer, name, number, expiration, cvv)
        setMessage('Credit Card saved successfully!')

        setTimeout(() => {
          setMessage(undefined)
        }, 3000)
      } catch ({ message }) {
        setState({ ...state, error: message })

        setTimeout(() => {
          setState({ error: undefined })
        }, 3000)
      }
    })()
  }

  const handleRetrieveCreditCards = () => {
    (async () => {
      try {
        const creditCards = await retrieveCreditCards()
        setCreditCards(creditCards)
      } catch ({ message }) {
        setState({ ...state, error: message })

        setTimeout(() => {
          setState({ error: undefined })
        }, 3000)
      }
    })()
  }

  const handlePurchase = () => {
    (async () => {
      try {
        await buyProducts()

        history.push('/home')
      } catch ({ message }) {
        setState({ ...state, error: message })

        setTimeout(() => {
          setState({ error: undefined })
        }, 3000)

      }
    })()
  }

  const handlePurchasedAlbums = () => {
    (async () => {
      try {
        const purchasedAlbums = await retrievePurchasedAlbums()
        setPurchased(purchasedAlbums)

        history.push('/my-albums')
      } catch ({ message }) {
        setState({ ...state, error: message })

        setTimeout(() => {
          setState({ error: undefined })
        }, 3000)
      }
    })()
  }

  const handleAddToPlaylist = idSong => {
    (async () => {
      try {
        await updatePlaylist(idSong)

      } catch ({ message }) {
        setState({ ...state, error: message })

        setTimeout(() => {
          setState({ error: undefined })
        }, 3000)
      }
    })()
  }

  const handleRetrievePlaylist = () => {
    (async () => {
      try {
        const songsPlaylist = await retrievePlaylist()
        setSongsPlaylist(songsPlaylist)

        history.push('/playlist')
      } catch ({ message }) {
        setState({ ...state, error: message })

        setTimeout(() => {
          setState({ error: undefined })
        }, 3000)
      }
    })()
  }

  const handleSearchArtist = (query) => {
    (async () => {
      try {
        const albums = await searchArtist(query)
        debugger
        setAlbums(albums)

        history.push('/search-artist')
      } catch ({ message }) {
        setState({ ...state, error: message })

        setTimeout(() => {
          setState({ error: undefined })
        }, 3000)
      }
    })()
  }

  const handleDeleteItem = (id) => {
    (async () => {
      try {
        await deleteCartItem(id)
        history.push('/shopping-cart')

      } catch ({ message }) {
        setState({ ...state, error: message })

        setTimeout(() => {
          setState({ error: undefined })
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

  const handleLogout = () => {
    (async () => {
      await logout()
    })()
    history.push('/login')
  }

  const handleGoToPay = (totalPay, cartItems) => {
    setTotalPay(totalPay)
    setCartItems(cartItems)
    history.push('/payment')
  }


  const { error } = state

  return <div className="App">
    <Route exact path='/' render={() => isLoggedIn() ? <Redirect to='/home' /> : <Redirect to='/login' />} />
    <Route path='/register' render={() => isLoggedIn() ? <Redirect to='/home' /> : <Register onRegister={handleRegister} onGoToLogin={handleGoToLogin} error={error} />} />
    <Route path='/login' render={() => isLoggedIn() ? <Redirect to='/home' /> : <Login onLogin={handleLogin} onGoToRegister={handleGoToRegister} error={error} />} />
    <Route path='/home' render={() => isLoggedIn() ? <><Header onLogout={handleLogout} onSearch={handleSearchArtist} onGoToPlaylist={handleRetrievePlaylist} onGoToPurchased={handlePurchasedAlbums} onGoToShoppingCart={handleRetrieveShoppingCart} onGoToProfile={handleGoToProfile} user={user} genreButtonClick={handleRetrieveGenre} yearButtonClick={handleRetrieveYear} bestSellingsButtonClick={handleRetrieveBestSellings} /><Home /></> : <Redirect to='/login' />} />
    <Route path='/albums/genre/:genre' render={props => isLoggedIn() ? <><Header onLogout={handleLogout} onSearch={handleSearchArtist} onGoToPlaylist={handleRetrievePlaylist} onGoToPurchased={handlePurchasedAlbums} onGoToShoppingCart={handleRetrieveShoppingCart} onGoToProfile={handleGoToProfile} user={user} genreButtonClick={handleRetrieveGenre} yearButtonClick={handleRetrieveYear} bestSellingsButtonClick={handleRetrieveBestSellings} /><ResultsGenre albums={albums} genre={props.match.params.genre} onAddToCart={handleAddToCart} message={message} error={error} /></> : <Redirect to='/login' />} />
    <Route path='/albums/year/:year' render={props => isLoggedIn() ? <><Header onLogout={handleLogout} onSearch={handleSearchArtist} onGoToPlaylist={handleRetrievePlaylist} onGoToPurchased={handlePurchasedAlbums} onGoToShoppingCart={handleRetrieveShoppingCart} onGoToProfile={handleGoToProfile} user={user} genreButtonClick={handleRetrieveGenre} yearButtonClick={handleRetrieveYear} bestSellingsButtonClick={handleRetrieveBestSellings} /><ResultsYear albums={albums} year={props.match.params.year} onAddToCart={handleAddToCart} message={message} error={error} /></> : <Redirect to='/login' />} />
    <Route path='/album/detail/:id' render={props => isLoggedIn() ? <><Header onLogout={handleLogout} onSearch={handleSearchArtist} onGoToPlaylist={handleRetrievePlaylist} onGoToPurchased={handlePurchasedAlbums} onGoToShoppingCart={handleRetrieveShoppingCart} onGoToProfile={handleGoToProfile} user={user} genreButtonClick={handleRetrieveGenre} yearButtonClick={handleRetrieveYear} bestSellingsButtonClick={handleRetrieveBestSellings} /><DetailItem albumDetail={albumDetail} idAlbum={props.match.params.id} onTrackedSong={handleRetrieveSong} file={file} message={message} error={error} addToPlaylist={handleAddToPlaylist} /></> : <Redirect to='/login' />} />
    <Route path='/albums/best-sellings/' render={() => isLoggedIn() ? <><Header onLogout={handleLogout} onSearch={handleSearchArtist} onGoToPlaylist={handleRetrievePlaylist} onGoToPurchased={handlePurchasedAlbums} onGoToShoppingCart={handleRetrieveShoppingCart} onGoToProfile={handleGoToProfile} user={user} genreButtonClick={handleRetrieveGenre} yearButtonClick={handleRetrieveYear} bestSellingsButtonClick={handleRetrieveBestSellings} /><ResultsBestSellings bestSellings={bestSellings} onAddToCart={handleAddToCart} message={message} error={error} /></> : <Redirect to='/login' />} />
    <Route path='/user/profile/' render={() => isLoggedIn() ? <><Header onLogout={handleLogout} onSearch={handleSearchArtist} onGoToPlaylist={handleRetrievePlaylist} onGoToPurchased={handlePurchasedAlbums} onGoToShoppingCart={handleRetrieveShoppingCart} onGoToProfile={handleGoToProfile} user={user} genreButtonClick={handleRetrieveGenre} yearButtonClick={handleRetrieveYear} bestSellingsButtonClick={handleRetrieveBestSellings} /><Profile onSubmit={handleProfile} user={user} error={error} message={message} onShipping={handlePostShipping} onShippingDetails={handleRetrieveShipping} shippingDetails={shippingDetails} onSaveCard={handleSaveCard} onCardDetails={handleRetrieveCreditCards} creditCards={creditCards} /></> : <Redirect to='/login' />} />
    <Route path='/shopping-cart' render={() => isLoggedIn() ? <><Header onLogout={handleLogout} onSearch={handleSearchArtist} onGoToPlaylist={handleRetrievePlaylist} onGoToPurchased={handlePurchasedAlbums} onGoToShoppingCart={handleRetrieveShoppingCart} onGoToProfile={handleGoToProfile} user={user} genreButtonClick={handleRetrieveGenre} yearButtonClick={handleRetrieveYear} bestSellingsButtonClick={handleRetrieveBestSellings} /><ResultsShopping albums={albums} error={error} onGoToPay={handleGoToPay} onToDelete={handleDeleteItem} /></> : <Redirect to='/login' />} />
    <Route path='/payment' render={() => isLoggedIn() ? <><Header onLogout={handleLogout} onSearch={handleSearchArtist} onGoToPlaylist={handleRetrievePlaylist} onGoToPurchased={handlePurchasedAlbums} onGoToShoppingCart={handleRetrieveShoppingCart} onGoToProfile={handleGoToProfile} user={user} genreButtonClick={handleRetrieveGenre} yearButtonClick={handleRetrieveYear} bestSellingsButtonClick={handleRetrieveBestSellings} /><Pay cartItems={cartItems} totalPay={totalPay} message={message} onShipping={handlePostShipping} onPurchased={handlePurchase} /></> : <Redirect to='/login' />} />
    <Route path='/my-albums' render={() => isLoggedIn() ? <><Header onLogout={handleLogout} onSearch={handleSearchArtist} onGoToPlaylist={handleRetrievePlaylist} onGoToPurchased={handlePurchasedAlbums} onGoToShoppingCart={handleRetrieveShoppingCart} onGoToProfile={handleGoToProfile} user={user} genreButtonClick={handleRetrieveGenre} yearButtonClick={handleRetrieveYear} bestSellingsButtonClick={handleRetrieveBestSellings} /><ResultsMyAlbums purchasedAlbums={purchasedAlbums} onGoToDetail={handleDetail} /></> : <Redirect to='/login' />} />
    <Route path='/playlist' render={() => isLoggedIn() ? <><Header onLogout={handleLogout} onSearch={handleSearchArtist} onGoToPlaylist={handleRetrievePlaylist} onGoToPurchased={handlePurchasedAlbums} onGoToShoppingCart={handleRetrieveShoppingCart} onGoToProfile={handleGoToProfile} user={user} genreButtonClick={handleRetrieveGenre} yearButtonClick={handleRetrieveYear} bestSellingsButtonClick={handleRetrieveBestSellings} /><ResultsPlaylist songsPlaylist={songsPlaylist} /></> : <Redirect to='/login' />} />
    <Route path='/search-artist' render={() => isLoggedIn() ? <><Header onLogout={handleLogout} onSearch={handleSearchArtist} onGoToPlaylist={handleRetrievePlaylist} onGoToPurchased={handlePurchasedAlbums} onGoToShoppingCart={handleRetrieveShoppingCart} onGoToProfile={handleGoToProfile} user={user} genreButtonClick={handleRetrieveGenre} yearButtonClick={handleRetrieveYear} bestSellingsButtonClick={handleRetrieveBestSellings} /><ResultsItem albums={albums} onAddToCart={handleAddToCart} message={message} error={error} /></> : <Redirect to='/login' />} />

  </div>
})
