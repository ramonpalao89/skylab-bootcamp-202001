const { mongoose } = require('../../../modum-data')
const { models: { Song, Artist, Album } } = require('../../../modum-data')
const fs = require('fs')
const path = require('path')
mongoose.connect('mongodb://localhost:27017/modum', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {

        const artists = []
        const songs = []
        const albums = []


        artists.push(new Artist({ name: 'Bob Marley' }))

        songs.push(new Song({
            name: 'Is This Love',
            artists: artists[0]._id,
            file: '01 Is This Love.mp3',
            isFav: false
        }), new Song({
            name: 'No Woman, No Cry',
            artists: artists[0]._id,
            file: '02 No Woman, No Cry [Live].mp3',
            isFav: false
        }), new Song({
            name: 'Could You Be Loved',
            artists: artists[0]._id,
            file: '03 Could You Be Loved.mp3',
            isFav: false
        }), new Song({
            name: 'Three Little Birds',
            artists: artists[0]._id,
            file: '04 Three Little Birds.mp3',
            isFav: false
        }), new Song({
            name: 'Buffalo Soldier',
            artists: artists[0]._id,
            file: '05 Buffalo Soldier [Album Version].mp3',
            isFav: false
        }), new Song({
            name: 'Get Up, Stand Up',
            artists: artists[0]._id,
            file: '06 Get Up, Stand Up [LP Version].mp3',
            isFav: false
        }), new Song({
            name: 'Stir It Up',
            artists: artists[0]._id,
            file: '07 Stir It Up [Edit].mp3',
            isFav: false
        }), new Song({
            name: 'One Love / People Get Ready',
            artists: artists[0]._id,
            file: '08 One Love-People Get Ready.mp3',
            isFav: false
        }), new Song({
            name: 'I Shot the Sheriff',
            artists: artists[0]._id,
            file: '09 I Shot the Sheriff.mp3',
            isFav: false
        }), new Song({
            name: 'Waiting in Vain',
            artists: artists[0]._id,
            file: '10 Waiting in Vain.mp3',
            isFav: false
        }), new Song({
            name: 'Redemption Song',
            artists: artists[0]._id,
            file: '11 Redemption Song [Album Version].mp3',
            isFav: false
        }), new Song({
            name: 'Satisfy My Soul',
            artists: artists[0]._id,
            file: '12 Satisfy My Soul.mp3',
            isFav: false
        }), new Song({
            name: 'Exodus',
            artists: artists[0]._id,
            file: '13 Exodus.mp3',
            isFav: false
        }), new Song({
            name: 'Jamming',
            artists: artists[0]._id,
            file: '14 Jamming.mp3',
            isFav: false
        }))

        albums.push(new Album({
            name: 'Legend',
            artists: [artists[0]._id],
            songs: [songs[0]._id, songs[1]._id, songs[2]._id, songs[3]._id, songs[4]._id, songs[5]._id, songs[6]._id, songs[7]._id, songs[8]._id, songs[9]._id, songs[10]._id, songs[11]._id, songs[12]._id, songs[13]._id,],
            genre: 'Reggae',
            year: '1984',
            priceVinyl: 9.99,
            priceDigital: 6.99,
            portrait: 'bob.jpeg'
        }))


        songs.forEach(song => {
            fs.copyFile(path.join(__dirname, song.file), path.join(__dirname, `../../../modum-data/songs/${song._id}.mp3`), (err) => {
                if (err) throw err;
                console.log('source.txt was copied to destination.txt');
            });

            song.file = `${song._id}.mp3`
        })

        albums.forEach(album => {
            fs.copyFile(path.join(`${__dirname}/../portraits`, album.portrait), path.join(__dirname, `../../../modum-data/portraits/${album._id}.jpeg`), (err) => {
                if (err) throw err;
                console.log('source.txt was copied to destination.txt');
            });

            album.portrait = `${album._id}.jpeg`
        })

        return Promise.all(Artist.create(artists).then(() => { Song.create(songs) }).then(() => Album.create(albums)).then(() => mongoose.disconnect()))
    })
