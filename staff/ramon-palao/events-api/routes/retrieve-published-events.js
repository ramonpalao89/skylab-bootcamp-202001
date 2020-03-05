const { retrievePublishedEvents } = require('../logic')
const { NotFoundError, NotAllowedError } = require('events-error')

module.exports = (req, res) => {
    const { payload: { sub: id } } = req

    try {
        retrievePublishedEvents(id)
            .then(event =>
                res.status(200).json(event)
            )
            .catch(({ message }) =>
                res
                    .status(404)
                    .json({
                        error: message
                    })
            )
    } catch (error) {
        let status = 400

        switch (true) {
            case error instanceof NotFoundError:
                status = 404 // not found
                break
            case error instanceof NotAllowedError:
                status = 403 // forbidden
        }

        const { message } = error

        res
            .status(status)
            .json({
                error: message
            })
    }
}