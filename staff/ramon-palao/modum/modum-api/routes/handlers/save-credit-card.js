const { saveCreditCard } = require('../../logic')
const { NotAllowedError, ContentError, NotFoundError} = require('modum-errors')

module.exports = (req, res) => {
    const { body: { issuer, name, number, expiration, cvv }, payload: { sub: id } } = req

    try {
        saveCreditCard(issuer, name, number, expiration, cvv, id)
            .then(() => res.status(201).end())
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