const { updateChart } = require('../../logic')
const { NotFoundError, ContentError } = require('modum-errors')

module.exports = (req, res) => {
    const { payload: { sub: id }, params: { idAlbum, format } } = req

    try {
        updateChart(id, idAlbum, format)
            .then(user =>
                res.status(201).json(user)
            )
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