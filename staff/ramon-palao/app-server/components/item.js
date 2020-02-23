const Detail = require('./detail')
module.exports = function (props = {}) {
    const {item: { id, name, thumbnail, price }} = props
    return `<li className="results--item item">
        <h3>${name}</h3>
        <form action="/detail/${id}" method="GET">
        <button type="submit" value=${id}><img src=${thumbnail}></button>
        </form>
        <span>${price} €</span>
    </li>`
}