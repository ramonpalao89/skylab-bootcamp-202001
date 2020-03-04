require('dotenv').config()

const { env: { PORT = 8080, NODE_ENV: env, MONGODB_URL }, argv: [, , port = PORT] } = process

const express = require('express')
const winston = require('winston')
const { registerUser, authenticateUser, retrieveUser, createEvent, retrievePublishedEvents, retrieveLastEvents, subscribeEvents, retrieveSubscribedEvents, updateEvents, deleteEvent } = require('./routes')
const { name, version } = require('./package')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const fs = require('fs')
const path = require('path')
const { jwtVerifierMidWare } = require('./mid-wares')
//const { database } = require('./data')
const mongoose = require('mongoose')
const cors = require('cors')

mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
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

        const jsonBodyParser = bodyParser.json()

        const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

        const app = express()

        app.use(cors())

        app.use(morgan('combined', { stream: accessLogStream }))

        app.post('/users', jsonBodyParser, registerUser)

        app.post('/users/auth', jsonBodyParser, authenticateUser)

        app.get('/users', jwtVerifierMidWare, retrieveUser)

        app.get('/users/:id', jwtVerifierMidWare, retrievePublishedEvents)

        app.get('/users/:id/retrieve-subscribed', jwtVerifierMidWare, retrieveSubscribedEvents)

        app.get('/last-events', retrieveLastEvents)

        app.post('/users/:id/events', [jwtVerifierMidWare, jsonBodyParser], createEvent)

        app.patch('/users/:id/subscribe', [jwtVerifierMidWare, jsonBodyParser], subscribeEvents)

        app.patch('/users/:id/update', [jwtVerifierMidWare, jsonBodyParser], updateEvents)

        app.delete('/users/:id/delete', [jwtVerifierMidWare, jsonBodyParser], deleteEvent)

        app.listen(port, () => logger.info(`server ${name} ${version} up and running on port ${port}`))

        process.on('SIGINT', () => {
            logger.info('server abruptly stopped')

            process.exit(0)
        })
    })

