const { register } = require('../logic')
const { App, Register } = require('../components')
const { logger } = require('../utils')

module.exports = (req, res) => {
    const { body: { name, surname, username, password } } = req

    try {
        register(name, surname, username, password)
            .then(() => res.redirect('/login'))
            .catch(error => {
                logger.warn(error)

                const { message } = error
                const { session: { acceptCookies } } = req

                return res.send(App({ title: 'Register', body: Register({ error: message }), acceptCookies }))
            })

    } catch (error) {

        logger.warn(error)

        const { message } = error
        const { session: { acceptCookies } } = req

        res.send(App({ title: 'Register', body: Register({ error: message }), acceptCookies }))
    }
}