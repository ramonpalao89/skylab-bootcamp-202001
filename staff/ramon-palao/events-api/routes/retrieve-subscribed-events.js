const { retrieveSubscribedEvents } = require('../logic')
const { NotFoundError } = require('../errors')

module.exports = (req, res) => {
    const { payload: { sub: id } } = req

    try {
        retrieveSubscribedEvents(id)
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

        if(error instanceof NotFoundError) status = 404

        const { message } = error

        res
            .status(status)
            .json({
                error: message
            })
    }
}