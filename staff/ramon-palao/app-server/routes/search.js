const { retrieveUser, searchVehicles } = require('../logic')
const { App, Landing } = require('../components')
const { logger } = require('../utils')

module.exports = (req, res) => {
    const { session: { token }, query: { query } } = req
    // req.session.query = query
    if (token) {
        try {
            retrieveUser(token)
                .then(user => {
                    const { name, username } = user
                    try {
                        searchVehicles(token, query)
                            .then(vehicles => {
                                const { session: { acceptCookies } } = req

                                res.send(App({ title: "Search", body: Landing({ name, username, query, results: vehicles }), acceptCookies }))
                            })
                            .catch(error => {

                                logger.error(error)
                                res.redirect('/error')

                            })
                    } catch (error) {
                        logger.error(error)
                        res.redirect('/error')
                    }
                })
                .catch(error => {
                    logger.error(error)

                    res.redirect('/error')
                })
        } catch (error) {
            logger.error(error)

            res.redirect('/error')
        }
    } else
        try {
            searchVehicles(undefined, query)
                .then(vehicles => {
                    const { session: { acceptCookies } } = req
                    res.send(App({ title: 'Search', body: Landing({ query, results: vehicles }), acceptCookies }))
                })
                .catch(error => {

                    logger.error(error)

                    res.redirect('/error')

                })
        } catch (error) {
            logger.error(error)

            res.redirect('/error')
        }
}