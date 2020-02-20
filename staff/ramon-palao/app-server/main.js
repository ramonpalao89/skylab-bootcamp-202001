const express = require('express')
const register = require('./logic/register')
const authenticate = require('./logic/authenticate')
const path = require('path')
const fs = require('fs')
const users = require('./utils/data')

const app = express()

app.use(express.static('public'));
app.use(express.static('logic'));
app.use(express.static('utils'));

app.post('/register', (req, res) => {
    let body = ''
    let _body = []

    req.on('data', chunk => {
        body += chunk
    })
    req.on('end', () => {
        body = body.split('&')
        body.forEach(data => {
            _body.push(data.split('=')[1])
        });
        let name = _body[0]
        let surname = _body[1]
        let username = _body[2]
        let password = _body[3]

        try {
            register(name, surname, username, password)

        } catch (error) {

            res.status(401).send(error.message)
        }

        // res.redirect("/login.html")
        res.sendFile(path.join(__dirname + '/public/index.html'))
    })
})

app.post('/login', (req, res) => {
    let body = ''
    let _body = []

    req.on('data', chunk => {
        body += chunk
    })
    req.on('end', () => {
        body = body.split('&')
        body.forEach(data => {
            _body.push(data.split('=')[1])
        });

        let username = _body[0]
        let password = _body[1]
        let name
        for (keys of users) if (keys.username === username) name = keys.name
        console.log(name)


        try {
            authenticate(username, password)

        } catch (error) {
            res.status(401).send(error.message)
        }
        users.indexOf()
        res.send(`Welcome ${name}`)
    })
})


app.listen(8080, function () {
    console.log('server up')
});