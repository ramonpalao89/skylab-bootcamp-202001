const {App, Register} = require('../components')

module.exports = ({ session: { acceptCookies } }, res) => {
    res.render('register', {acceptCookies})
    // res.send(App({ title: 'Register', body: Register(), acceptCookies }))
}