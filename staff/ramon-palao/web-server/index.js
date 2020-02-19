// const http = require('http')
// const fs = require('fs')
// const url = require('url')
const logger = require('./utils/logger')
const express = require('express')
const app = express()

logger.info('starting server')
const myLogger = function (req, res, next) {
    logger.info(`request from IP: ${req.socket.remoteAddress}`)
    next()
  }
  
app.use(myLogger)

app.use(express.static('public'))

app.use(express.static('utils'))

app.listen(8080)

// logger.info('starting server')

// const server = http.createServer((req, res) => {

//     logger.info(`request from IP: ${req.socket.remoteAddress}`)

//     let q = url.parse(req.url, true);
//     let filename = "." + q.pathname;
//     if (filename === './') filename = 'index.html'

//     // let path = req.url
//     // if (path === './') path += 'index.html'
//     // path = `.${path}`
    
//     fs.readFile(filename, function (error, html) {
//         res.setHeader("Content-Type", "text/html")

//         if (error) {
//             logger.error(error)
//             res.writeHead(404)
//             return res.end("404 Not Found");
//         } 
//         res.write(html);
//         res.end();
//     })
// })
// server.listen(8080)
