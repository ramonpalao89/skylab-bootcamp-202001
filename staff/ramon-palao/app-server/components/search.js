module.exports = function(props = {}){
    const {error, query} = props

    return `<h2>Search</h2>
    <form action="/search/" method="GET">
        <input type="text" name="query" placeholder="criteria" defaultValue=${query} />
        <button type="submit">Search</button>
    </form>`
}