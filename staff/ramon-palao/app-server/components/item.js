module.exports = function (props = {}) {
    const {item: { id, name, thumbnail, price, isFav }} = props
    return `<li class="results--item item">
        <h3>${name}</h3>
        <form action="/fav/${id}" method="POST"><button type="submit" value=${id}>${isFav ? '💖' : '🤍'}</button></form>
        <form action="/detail/${id}" method="GET">
        <button type="submit" value=${id}><img src=${thumbnail}></button>
        </form>
        <span>${price} €</span>
    </li>`
}