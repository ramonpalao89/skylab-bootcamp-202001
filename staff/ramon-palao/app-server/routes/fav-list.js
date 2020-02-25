const {retrieveFavVehicles} = require('../logic')
const {App, Favs} = require('../components')
const {logger} = require('../utils')

module.exports = (req, res) => {
    const { session: { token, acceptCookies } } = req

    try {
        retrieveFavVehicles(token, (error, favs) => {
            if (error) {
                logger.error(error)
                res.redirect('/error')

            } else {
                res.send(App({ title: `Favorites`, body: Favs({ favs }), acceptCookies }))
            }
        })
    } catch (error) {
        logger.error(error)
        res.redirect('/error')
    }
}