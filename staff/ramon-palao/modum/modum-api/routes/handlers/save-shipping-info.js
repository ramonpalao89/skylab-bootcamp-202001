const { saveShippingInfo } = require('../../logic')
const { ContentError, NotFoundError} = require('modum-errors')

module.exports = (req, res) => {
    const { body: { customerName, streetAddress, city, country, phoneNumber }, payload: { sub: id } } = req

    try {
        saveShippingInfo(customerName, streetAddress, city, country, phoneNumber, id)
            .then(() => res.status(201).end())
            .catch(error => {
                let status = 400

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