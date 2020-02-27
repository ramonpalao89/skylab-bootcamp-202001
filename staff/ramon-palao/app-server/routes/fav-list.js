const { retrieveFavVehicles } = require('../logic')
const { App, Favs, Search } = require('../components')
const { logger } = require('../utils')

module.exports = (req, res) => {
    const { session: { token, acceptCookies } } = req

    try {
        retrieveFavVehicles(token)
            .then(favs => {
                const backUrl = req.get('referer') || '/search'
                res.render('favslist', {favs, backUrl, acceptCookies})
                // res.send(App({ title: `Favorites`, body: Favs({ favs, backUrl }), acceptCookies }))
            }).catch(error => {
                logger.error(error)
                res.redirect('/error')
            })
    } catch (error) {
        logger.error(error)
        res.redirect('/error')
    }
}