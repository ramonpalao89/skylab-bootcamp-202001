const { deleteCartItem } = require('../../logic')
const { NotFoundError } = require('modum-errors')

module.exports = (req, res) => {
    const { payload: { sub: id }, params: { idAlbum } } = req

    try {
        deleteCartItem(id, idAlbum)
            .then(chart =>{
                res.status(200).json(chart)
            })
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