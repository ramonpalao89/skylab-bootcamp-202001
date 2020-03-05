const { toogleFavVehicle } = require('../logic')
const { logger } = require('events-utils')

module.exports = (req, res) => {
    const { session, params: { id } } = req
    const { token } = session

    if (!token) {
        session.referer = req.get('referer')

        session.fav = id

        return res.redirect('/login')
    }

    try {
        toogleFavVehicle(token, id)
            .then(() => {
                const { referer = req.get('referer') } = session

                delete session.referer
                delete session.fav

                res.redirect(referer)

            }).catch(error => {

                logger.error(error)
                res.redirect('/error')

            })
    } catch (error) {
        logger.error(error)
        res.redirect('/error')
    }
}