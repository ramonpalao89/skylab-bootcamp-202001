require('dotenv').config()

const { env: { PORT = 8080, NODE_ENV: env, MONGODB_URL }, argv: [, , port = PORT] } = process

const express = require('express')
const winston = require('winston')
const { name, version } = require('./package')
const morgan = require('morgan')
const fs = require('fs')
const path = require('path')
const { cors } = require('./mid-wares')
const { mongoose } = require('modum-data')
const router = require('./routes')
const multer = require('multer')
const crypto = require('crypto') //To rename upload files
const GridFsStorage = require('multer-gridfs-storage')
const Grid = require('gridfs-stream')



// let db, client

mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    // .then(_client => {
    //     client = _client
    //     db = client.db('modum')
    // })
    .then(() => {
        const logger = winston.createLogger({
            level: env === 'development' ? 'debug' : 'info',
            format: winston.format.json(),
            transports: [
                new winston.transports.File({ filename: 'server.log' })
            ]
        })

        if (env !== 'production') {
            logger.add(new winston.transports.Console({
                format: winston.format.simple()
            }))
        }

        const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

        const app = express()

        app.use(cors)

        app.use(morgan('combined', { stream: accessLogStream }))

        app.use('/api', router)
        app.use(router)



        app.listen(port, () => logger.info(`server ${name} ${version} up and running on port ${port}`))

        process.on('SIGINT', () => {
            logger.info('server abruptly stopped')

            process.exit(0)
        })
    })

    // const getConnection = () => db
    // module.exports = {
    //     getConnection
    // }