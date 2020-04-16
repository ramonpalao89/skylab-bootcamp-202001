const { retrieveSong } = require('../../logic')
const { NotAllowedError, ContentError } = require('modum-errors')
const fs = require('fs')
const path = require('path')

module.exports = (req, res) => {
    const { params: { id, idSong } } = req
    // const { payload: { sub: id } } = req

    try {
        retrieveSong(id, idSong)
            .then(file => {
                if (file.length) {
                    res.status(200)
                    res.set('content-type', 'audio/mp3')
                    res.set('accept-ranges', 'bytes')

                    let readStream = fs.createReadStream(path.join(__dirname, `../../data/songs/${file}`))

                    readStream.on('close', () => {
                        res.end()
                    })

                    readStream.pipe(res)
                } else {
                    res.status(401)
                }
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