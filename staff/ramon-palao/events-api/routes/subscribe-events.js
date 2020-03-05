const { subscribeEvents } = require('../logic')
const { ContentError, NotAllowedError } = require('events-error')

module.exports = (req, res) => {
    const { payload: { sub: id }, body: { idEvent } } = req

    try {
        subscribeEvents(id, idEvent)
            .then(() => res.status(201).end()
            )
            .catch(error => {
                let status = 406
                const { message } = error
                res
                    .status(status)
                    .json({
                        error: message
                    })
            })

    } catch (error) {
        let status = 400

        if (error instanceof TypeError || error instanceof ContentError || error instanceof NotAllowedError)
            status = 406 // not acceptable

        const { message } = error

        res
            .status(status)
            .json({
                error: message
            })
    }
}