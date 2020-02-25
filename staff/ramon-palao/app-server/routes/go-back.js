module.exports = (req, res) => {
    const { query: {query} } = req
    
    res.redirect(`/search?query=${query}`)
}