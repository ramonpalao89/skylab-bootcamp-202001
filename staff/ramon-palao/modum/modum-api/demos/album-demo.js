const { mongoose } = require('../../modum-data')
const { models: { Song, Artist, Album } } = require('../../modum-data')

mongoose.connect('mongodb://localhost:27017/modum', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {

        const newAlbum = new Album({
            name: '',
            artists: [],
            songs: [],
            genre: '',
            year: '',
            priceVinyl: '',
            priceDigital: '',
            portrait: ''
        })

        return newAlbum.save()
    })
    .then(() => mongoose.disconnect())