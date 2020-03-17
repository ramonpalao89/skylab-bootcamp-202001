const multer = require('multer')
const { mongoose, mongoose: { Types: { ObjectId } } } = require('modum-data')
const { GridFSBucket } = require('mongodb')
const { Readable } = require('stream')

const conn = mongoose.connection

const getTrack = (req, res) => {
 
    const { params: {trackId} } = req

    res.set('content-type', 'audio/mp3')
    res.set('accept-ranges', 'bytes')

    const bucket = new GridFSBucket(conn.db, {
        bucketName: 'tracks'
    })


    let downloadStream = bucket.openDownloadStream(ObjectId(trackId))

    downloadStream.on('data', chunk => {
        res.write(chunk)
    })

    downloadStream.on('error', () => {
        res.sendStatus(404)
    })

    downloadStream.on('end', () => {
        res.end()
    })
}

const uploadTrack = (req, res) => {
    const storage = multer.memoryStorage()
    const upload = multer({
        storage,
        limits: {
            fields: 1,
            files: 1,
            parts: 2
        }
    })
    upload.single('track')(req, res, (error) => {
        if (error) {
            console.log(error)
            return res.status(400).json({ message: error.message })
        } else if (!req.body.name) {
            return res.status(400).json({ message: 'No track name in request body' })
        }

        let trackName = req.body.name

        const readableTrackStream = new Readable()
        readableTrackStream.push(req.file.buffer) //convierte el buffer a stream
        readableTrackStream.push(null) //para que acabe con el pipe

        const bucket = new GridFSBucket(conn.db, {
            bucketName: 'tracks'
        })

        const uploadStream = bucket.openUploadStream(trackName)
        const id = uploadStream.id
        readableTrackStream.pipe(uploadStream)

        uploadStream.on('error', () => {
            return res.status(500).json({ message: 'Error uploading your file' })
        })

        uploadStream.on('finish', () => {
            return res.status(201).json({ message: 'File uploaded succesfully with id ' + id })
        })


    })
}

module.exports = {
    getTrack,
    uploadTrack
}