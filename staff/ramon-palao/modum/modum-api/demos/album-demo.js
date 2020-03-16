const { mongoose } = require('../../modum-data')
const { models: { Song, Artist, Album } } = require('../../modum-data')
// const fs = require('fs')
// const path = require('path')
mongoose.connect('mongodb://localhost:27017/modum', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {

        const albums = []

        const newAlbum = new Album({
            name: 'el mal querer',
            artists: [],
            songs: [],
            genre: 'pop',
            year: '2018',
            priceVinyl: '9.99',
            priceDigital: '6.99',
            portrait: 'rosalia'
        })

        return newAlbum.save()
    })
    .then(() => mongoose.disconnect())