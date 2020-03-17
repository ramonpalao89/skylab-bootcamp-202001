const { retrieveYear } = require('../../logic')
const { NotFoundError, ContentError } = require('modum-errors')

module.exports = (req, res) => {
    const { params: { publishYear } } = req
    try {
        retrieveYear(publishYear)
            .then(album =>{
                res.status(200).json(album)
            })
            .catch(error => {
                let status = 400

                if (error instanceof NotFoundError)
                    status = 404 // not authorized

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