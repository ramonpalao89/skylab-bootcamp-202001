module.exports = function(props = {}){
    const {query = '', warning  } = props

    return `<h2>Search</h2>
    <form action="/search/" method="GET">
        <input type="text" name="query" placeholder="criteria" defaultValue=${query} />
        <button type="submit">Search</button>
        <a href="/favslist/">Go to favorites</a>

        ${ warning ? Feedback({ level: 'warning', message: warning }) : ''}
    </form>`
}