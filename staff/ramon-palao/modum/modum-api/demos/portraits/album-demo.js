const { mongoose } = require('modum-data')
const { models: { Song, Artist, Album } } = require('modum-data')

mongoose.connect('mongodb://localhost:27017/modum', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {

        const newAlbum = new Album({
            name: 'Jackboys',
            artists: [],
            songs: [],
            genre: 'Hip-Hop',
            year: '2020',
            priceVinyl: '9,99',
            priceDigital: '9,99',
            portrait: 'travis'
        })

        return newAlbum.save()
    })
    .then(() => mongoose.disconnect())