const net = require('net')
const fs = require('fs')
const logger = require('./logger')

let connections = 0

logger.info('starting server')

const server = net.createServer(socket => {

    logger.debug('setting encoding to utf8')
    socket.setEncoding('utf8')

    socket.on('data', request => {
        let host = (request.split('\n')[2]).split(' ')[1]
        logger.info(`request received ${host} from ip: ${socket.remoteAddress}`)

        let file = (request.toString().split('/')[1]).split(' ')[0]
        if (file === '') file = 'index.html'

        fs.readFile(file, function (error, content) {
            if(error){
                logger.error(error)
                return socket.end(`HTTP/1.1 404 BAD REQUEST\nServer:Cowboy\nAccess-Control-Allow-Origin:*\nConnections:${++connections}\nContent-Type:text/html\n<h1>NOT FOUND</h1>`)
            }
            socket.end(`HTTP/1.1 200 OK\nServer:Cowboy\nAccess-Control-Allow-Origin:*\nConnections:${++connections}\nContent-Type:text/html\n\n${content}\n`)

        })
        socket.on('error', error => logger.error(error))
    })
})
server.listen(8080)