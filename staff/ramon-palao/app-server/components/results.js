const Item = require('./item')

module.exports = function (props={}) {
    const {results} = props
    //debugger
    return `<ul className="results">
        ${results.map(item => Item({item})).join('')}
    </ul>`
}