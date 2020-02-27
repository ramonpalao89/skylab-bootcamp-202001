const { authenticate } = require('../logic')
const { Login, App } = require('../components')
const { logger } = require('../utils')

module.exports = (req, res) => {
    const { body: { username, password }, session } = req

    try {
        authenticate(username, password)
            .then(token => {
                session.token = token

                const { fav } = session

                if (fav) return res.redirect(307, `/fav/${fav}`)

                res.redirect('/')
            })
            .catch(error => {

                logger.warn(error)

                const { message } = error
                const { session: { acceptCookies } } = req

                res.render('login', {error: message, acceptCookies})

                // res.send(App({ title: 'Login', body: Login({ error: message }), acceptCookies }))
            })

    } catch (error) {

        logger.error(error)

        const { message } = error
        const { session: { acceptCookies } } = req

        res.render('login', {error: message, acceptCookies})

        // res.send(App({ title: 'Login', body: Login({ error: message }), acceptCookies }))
    }
}