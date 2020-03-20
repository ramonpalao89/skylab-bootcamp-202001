const { retrievePortrait } = require('../../logic')
const { NotAllowedError, ContentError } = require('modum-errors')
const fs = require('fs')
const path = require('path')

module.exports = (req, res) => {
    const { params: { idAlbum } } = req

    try {
        retrievePortrait(idAlbum)
            .then(file => {
                debugger
                res.status(200)
                res.set('content-type', 'image/jpeg')
                res.set('accept-ranges', 'bytes')

                let readStream = fs.createReadStream(path.join(__dirname, `../../../modum-data/portraits/${file}`)).pipe(res)

                readStream.on('close', () => {
                    res.end()
                })

            })
            .catch(error => {
                let status = 400

                if (error instanceof NotAllowedError)
                    status = 401 // not authorized

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