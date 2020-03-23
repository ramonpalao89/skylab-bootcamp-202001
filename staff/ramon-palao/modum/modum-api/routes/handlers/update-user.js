const { updateUser } = require('../../logic')
const { NotFoundError, ContentError, NotAllowedError } = require('modum-errors')

module.exports = (req, res) => {
    const { payload: { sub: id }, body } = req

    try {
        updateUser(id, body)
            .then(user =>
                res.status(201).json(user)
            )
            .catch(error => {
                let status = 400

                if (error instanceof NotFoundError)
                    status = 404

                if (error instanceof NotAllowedError)
                    status = 409

                const { message } = error

                res
                    .status(status)
                    .json({
                        error: message
                    })
            })
    } catch (error) {
        let status = 400

        if (error instanceof TypeError || error instanceof ContentError)
            status = 406 // not acceptable

        const { message } = error

        res
            .status(status)
            .json({
                error: message
            })
    }
}