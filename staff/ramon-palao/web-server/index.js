const http = require('http')
const fs = require('fs')
const url = require('url')
const logger = require('./logger')

logger.info('starting server')

const server = http.createServer((req, res) => {

    logger.info(`request from IP: ${req.socket.remoteAddress}`)

    let q = url.parse(req.url, true);
    let filename = "." + q.pathname;
    if (filename === './') filename = 'index.html'

    // let path = req.url
    // if (path === './') path += 'index.html'
    // path = `.${path}`
    
    fs.readFile(filename, function (error, html) {
        res.setHeader("Content-Type", "text/html")

        if (error) {
            logger.error(error)
            res.writeHead(404)
            return res.end("404 Not Found");
        } 
        res.write(html);
        res.end();
    })
})
server.listen(8080)