const express = require('express')
const {logger, loggerMidWare, cookieParserMidWare} = require('./utils')
const bodyParser = require('body-parser')
const { retrieveUser, register, authenticate } = require('./logic')
const path = require('path')
const { Login, App, Home, Register, Landing, Cookies } = require('./components')
const {sessions} = require('./data')

const urlencodedBodyParser = bodyParser.urlencoded({ extended: false })

const { argv: [, , port = 8080] } = process

logger.level = logger.DEBUG
logger.path = path.join(__dirname, 'server.log')

logger.debug('setting up server')
const app = express()

app.use(loggerMidWare)
app.use(cookieParserMidWare)

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    const {cookies: {cookieConsent}} = req
    res.send(App({ title: 'My App', body: Landing(), cookies: Cookies() }))
})

app.get('/login', (req, res) => {
    const {cookies: {username, cookieConsent} } = req

    if (sessions.includes(username)) return res.redirect(`/home/${username}`)
    res.send(App({ title: 'Login', body: Login(), cookies: Cookies() }))
})

app.use(urlencodedBodyParser)

app.post('/accept-cookies', (req, res) =>{
     res.setHeader('set-cookies', 'cookieConsent=true')
     res.redirect(req.get('referer'))
})

app.get('/home/:username', (req, res) => {
    const { cookies: {cookieConsent}, params: { username } } = req

    if (sessions.includes(username)) {
        const { name } = retrieveUser(username)

        const {cookies: {username: _username}} = req

        username !== _username && res.setHeader(`set-cookie', 'username=${username}`)

        res.send(App({ title: 'Home', body: Home({ name, username }), cookies: Cookies() }))

    } else res.redirect('/login')
})

app.post('/logout', (req, res) => {
    const { body: { username } } = req

    const index = sessions.indexOf(username)

    sessions.splice(index, 1)

    res.clearCookie('username')

    res.redirect('/login')
})

app.post('/register', (req, res) => {

    const {name, surname, username, password} = req.body
    try {
        register(name, surname, username, password)

        res.redirect('/login')
    } catch ({message}) {

        res.send(App({title: 'Register', body: Register({error: message})}))
    }
})

app.get('/register', (req, res) => {
    const {cookies: {username, cookieConsent}} = req

    if (sessions.includes(username)) return res.redirect(`/home/${username}`)
    res.send(App({title: 'Register', body: Register(), cookies: Cookies()}))
})

app.post('/login', (req, res) => {
    const { username, password } = req.body
    try {
        authenticate(username, password)

        sessions.push(username)

        const {cookies: {username: _username}} = req

        username !== _username && res.setHeader('set-cookie', `username=${username}` )

        res.redirect(`/home/${username}`)

    } catch ({ message }) {
        res.send(App({ title: 'Login', body: Login({ error: message }) }))
    }
})

app.listen(port, () => logger.info(`server up and running on port ${port}`))

process.on('SIGINT', () => {
    logger.warn(`server abruptly stopped`)

    process.exit(0)
})