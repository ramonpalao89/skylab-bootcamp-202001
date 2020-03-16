const { retrieveOneShipping } = require('../../logic')
const { NotAllowedError, NotFoundError } = require('modum-errors')

module.exports = (req, res) => {
    const { payload: { sub: id }, params: { idShipping } } = req

    try {
        retrieveOneShipping(id, idShipping)
            .then(shipping =>
                res.status(200).json(shipping)
            )
            .catch(error => {
                let status = 400

                if (error instanceof NotAllowedError)
                    status = 401 // not authorized

                if (error instanceof NotFoundError)
                    status = 404

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