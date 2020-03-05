const { register } = require('../logic')
const { App, Register } = require('../components')
const { logger } = require('events-utils')

module.exports = (req, res) => {
    const { body: { name, surname, username, password } } = req

    try {
        register(name, surname, username, password)
            .then(() => res.redirect('/login'))
            .catch(error => {
                logger.warn(error)

                const { message } = error
                const { session: { acceptCookies } } = req

                res.render('register', {error: message, acceptCookies})

                // return res.send(App({ title: 'Register', body: Register({ error: message }), acceptCookies }))
            })

    } catch (error) {

        logger.warn(error)

        const { message } = error
        const { session: { acceptCookies } } = req

        res.render('register', {error: message, acceptCookies})

        // res.send(App({ title: 'Register', body: Register({ error: message }), acceptCookies }))
    }
}