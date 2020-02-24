const express = require('express')
const { logger, loggerMidWare } = require('./utils')
const bodyParser = require('body-parser')
const { retrieveUser, register, authenticate, searchVehicles, retrieveVehicle, toogleFavVehicle, retrieveFavVehicles } = require('./logic')
const path = require('path')
const { Login, App, Home, Register, Landing, Search, Results, Detail, Favs } = require('./components')
const session = require('express-session')

const urlencodedBodyParser = bodyParser.urlencoded({ extended: false })

const { argv: [, , port = 8080] } = process

logger.level = logger.DEBUG
logger.path = path.join(__dirname, 'server.log')

logger.debug('setting up server')

const app = express()

app.use(loggerMidWare)
app.use(express.static(path.join(__dirname, 'public')))
app.use('/components', express.static(path.join(__dirname, 'components'))) // NOTE to see sass files in browser
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: true }))

app.get('/', ({ session: { acceptCookies } }, res) => {
    res.send(App({ title: 'My App', body: Landing(), acceptCookies }))
})

app.get('/login', (req, res) => {
    const { session: { username } } = req

    if (username) return res.redirect(`/home/${username}`)

    const { session: { acceptCookies } } = req

    res.send(App({ title: 'Login', body: Login(), acceptCookies }))
})

app.post('/login', urlencodedBodyParser, (req, res) => {
    const { body: { username, password }, session } = req

    try {
        authenticate(username, password, (error, token) => {
            if (error) {
                const { message } = error
                const { session: { acceptCookies } } = req

                return res.send(App({ title: 'Login', body: Login({ error: message }), acceptCookies }))
            }

            retrieveUser(token, (error, user) => {
                if (error) {
                    const { message } = error
                    const { session: { acceptCookies } } = req

                    return res.send(App({ title: 'Login', body: Login({ error: message }), acceptCookies }))
                }

                session.token = token

                const { username } = user

                res.redirect(`/search/${username}`)
            })
        })
    } catch ({ message }) {
        const { session: { acceptCookies } } = req

        res.send(App({ title: 'Login', body: Login({ error: message }), acceptCookies }))
    }
})

app.get('/search/:username', (req, res) => {
    const { params: { username }, session: { token } } = req

    try {
        retrieveUser(token, (error, user) => {
            if (error) {
                const { message } = error
                const { session: { acceptCookies } } = req

                return res.send(App({ title: 'Login', body: Login({ error: message }), acceptCookies }))
            }

            const { username: _username } = user

            if (username === _username) {
                const { name } = user

                const { session: { acceptCookies } } = req

                res.send(App({ title: 'Search', body: Search({ name, username }), acceptCookies }))
            } else res.redirect('/login')
        })
    } catch ({ message }) {
        const { session: { acceptCookies } } = req

        res.send(App({ title: 'Login', body: Login({ error: message }), acceptCookies }))
    }
})

app.get('/search', (req, res) => {
    const { session: { token, acceptCookies }, query } = req
    req.session.query = query
    try {

        retrieveUser(token, (error, user) => {
            if (error) {
                const { message } = error
                const { session: { acceptCookies } } = req

                return res.send(App({ title: 'Login', body: Login({ error: message }), acceptCookies }))
            }
            const { name } = user
            const _query = query.query

            searchVehicles(token, _query, (error, vehicles) => {
                if (error) {
                    const { message } = error
                    const { session: { acceptCookies } } = req

                    return res.send(App({ title: 'Search', body: Search({ error: message }), acceptCookies }))
                }

                return res.send(App({ title: "Search", body: Search({ name, vehicles }), results: Results({ name, vehicles }), acceptCookies }))
            })
        })

    } catch ({ message }) {
        const { session: { acceptCookies } } = req

        return res.send(App({ title: 'Login', body: Login({ error: message }), acceptCookies }))
    }
})

app.get('/detail/:id', (req, res) => {
    const { session: { token, acceptCookies }, params: { id } } = req
    try {
        retrieveVehicle(token, id, (error, detail) => {
            if (error)
                res.redirect(req.get('referer'))
            if (detail)
                res.send(App({ title: `${detail.name}`, body: Detail({ detail }), acceptCookies }))
        })
    } catch ({ message }) {
        const { session: { acceptCookies } } = req

        return res.send(App({ title: 'Login', body: Login({ error: message }), acceptCookies }))
    }

})

app.post('/fav/:id', (req, res) => {
    const { session: { token, acceptCookies }, params: { id } } = req

    try {
        toogleFavVehicle(token, id, error => {
            if (error) {
                const { session: { acceptCookies } } = req
                return res.send(App({ title: 'Search', body: Search({ error: message }), acceptCookies }))

            } else {
                res.redirect(req.get("referer"))
            }
        })
    } catch ({ message }) {
        const { session: { acceptCookies } } = req
        return res.send(App({ title: 'Search', body: Search({ error: message }), acceptCookies }))
    }
})

app.get('/favslist/', (req, res) => {
    const { session: { token, acceptCookies } } = req

    try {
        retrieveFavVehicles(token, (error, favs) => {
            if (error) {
                const { session: { acceptCookies } } = req
                return res.send(App({ title: 'Search', body: Search({ error: message }), acceptCookies }))
            } else {
                res.send(App({ title: `Favorites`, body: Favs({ favs }), acceptCookies }))
            }
        })
    } catch (error) {
        const { session: { acceptCookies } } = req
        return res.send(App({ title: 'Search', body: Search({ error: message }), acceptCookies }))
    }
})

app.get('/back', (req, res) => {
    const { session: { query } } = req
    res.redirect(`/search?query=${query.query}`)
})

app.post('/logout', urlencodedBodyParser, ({ session }, res) => {
    session.destroy(() => res.redirect('/login'))
})

app.post('/register', urlencodedBodyParser, (req, res) => {
    const { body: { name, surname, username, password } } = req

    try {
        register(name, surname, username, password, error => {
            if (error) {
                const { message } = error
                const { session: { acceptCookies } } = req

                return res.send(App({ title: 'Register', body: Register({ error: message }), acceptCookies }))
            }

        })

        res.redirect('/login')

    } catch ({ message }) {
        const { session: { acceptCookies } } = req

        res.send(App({ title: 'Register', body: Register({ error: message }), acceptCookies }))
    }
})

app.get('/register', ({ session: { acceptCookies } }, res) => {
    res.send(App({ title: 'Register', body: Register(), acceptCookies }))
})

app.post('/accept-cookies', (req, res) => {
    const { session } = req

    session.acceptCookies = true

    res.redirect(req.get('referer'))
})

app.listen(port, () => logger.info(`server up and running on port ${port}`))

process.on('SIGINT', () => {
    logger.warn(`server abruptly stopped`)

    process.exit(0)
})