const fs = require('fs')

function log(level, message) {
    const output = `${level} ${message}`
    const ws= fs.createWriteStream("./server.log", {flags:'a'})
    ws.write(output + "\n")
    console.log("Successfully Written to File.")
    }

module.exports = {
    debug(message) { log('DEBUG', message) },
    info(message) { log('INFO', message) },
    warn(message) { log('WARN', message) },
    error(message) { log('ERROR', message) },
    fatal(message) { log('FATAL', message) }
}