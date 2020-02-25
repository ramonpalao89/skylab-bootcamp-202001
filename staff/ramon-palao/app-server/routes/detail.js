const { retrieveVehicle } = require('../logic')
const { App, Detail } = require('../components')
const { logger } = require('../utils')

module.exports = (req, res) => {
    const { session: { token, acceptCookies }, params: { id } } = req
    try {
        retrieveVehicle(token, id, (error, detail) => {
            if (error) {
                logger.error(error)
                res.redirect('/error')
            } else {
                res.send(App({ title: `${detail.name}`, body: Detail({ detail }), acceptCookies }))
            }
            // if (detail)
            //     res.redirect(`/detail/${id}`)
            // // res.send(App({ title: `${detail.name}`, body: Detail({ detail }), acceptCookies }))
        })
    } catch (error) {
        logger.error(error)
        res.redirect('/error')
    }
}