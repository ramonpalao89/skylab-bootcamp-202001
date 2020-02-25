const { toogleFavVehicle } = require('../logic')
const { logger } = require('../utils')

module.exports = (req, res) => {
    const { session, params: { id } } = req
    const { token } = session

    if (!token) {
        session.referer = req.get('referer')

        session.fav = id

        return res.redirect('/login')
    }

    try {
        toogleFavVehicle(token, id, error => {
            if (error) {

                logger.error(error)
                res.redirect('/error')

            } else {
                const { referer = req.get('referer') } = session

                delete session.referer
                delete session.fav

                res.redirect(referer)
            }
        })
    } catch (error) {
        logger.error(error)
        res.redirect('/error')
    }
}