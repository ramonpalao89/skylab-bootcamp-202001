const { retrieveVehicle } = require('../logic')
const { App, Detail } = require('../components')
const { logger } = require('events-utils')

module.exports = (req, res) => {
    const { session: { token, acceptCookies }, params: { id } } = req
    try {
        retrieveVehicle(token, id)
            .then(detail => {
                
                const backUrl = req.get('referer') || '/search'
                res.render(`detail`, {detail, backUrl, acceptCookies})
                // res.send(App({ title: `${detail.name}`, body: Detail({ detail, backUrl }), acceptCookies }))
            }).catch(error => {
                logger.error(error)
                res.redirect('/error')
            })
    } catch (error) {
        logger.error(error)
        res.redirect('/error')
    }
}