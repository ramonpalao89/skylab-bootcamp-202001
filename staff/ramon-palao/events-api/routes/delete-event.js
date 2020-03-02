const { deleteEvent } = require('../logic')
const { NotFoundError } = require('../errors')

module.exports = (req, res) => {
    const { payload: { sub: id }, body: { idEvent } } = req

    try {
        deleteEvent(id, idEvent)
            .then(() => res.status(201).end()
            )
            .catch(error => {
                let status = 404
                const { message } = error
                res
                    .status(status)
                    .json({
                        error: message
                    })
            })

    } catch (error) {
        let status = 400

        if (error instanceof NotFoundError)
            status = 404

        const { message } = error

        res
            .status(status)
            .json({
                error: message
            })
    }
}