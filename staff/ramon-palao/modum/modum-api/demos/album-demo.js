const { mongoose } = require('../../modum-data')
const { models: { Song, Artist, Album } } = require('../../modum-data')
// const fs = require('fs')
// const path = require('path')
mongoose.connect('mongodb://localhost:27017/modum', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {

        const albums = []

        const newAlbum = new Album({
            name: 'Loca',
            artists: [],
            songs: [],
            genre: 'latin',
            year: '2010',
            priceVinyl: '9.99',
            priceDigital: '6.99',
            portrait: 'shakira'
        })

        return newAlbum.save()
    })
    .then(() => mongoose.disconnect())