const { mongoose } = require('../../../modum-data')
const { models: { Song, Artist, Album } } = require('../../../modum-data')
const fs = require('fs')
const path = require('path')
mongoose.connect('mongodb://localhost:27017/modum', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {

        const artists = []
        const songs = []
        const albums = []

        artists.push(new Artist({ name: 'Bob Marley' }), new Artist({ name: 'Marvin Gaye' }), new Artist({ name: 'Aretha Franklin' }), new Artist({ name: 'Green Day' }), new Artist({ name: 'Guns N\' Roses' }), new Artist({ name: 'Maroon 5' }), new Artist({ name: 'The Clash' }), new Artist({ name: 'The Police' }), new Artist({ name: 'Extremoduro' }), new Artist({ name: 'Rosalía' }), new Artist({ name: 'Juanes' }), new Artist({ name: 'Michael Jackson' }), new Artist({ name: 'Violadores del Verso' }), new Artist({ name: 'Eminem' }), new Artist({ name: 'Nach' }), new Artist({ name: 'Don Carlos' }), new Artist({ name: 'La Oreja de Van Gogh' }), new Artist({ name: 'Madonna' }), new Artist({ name: 'Public Enemy' }), new Artist({ name: 'Calle 13' }), new Artist({ name: 'David Bowie' }), new Artist({ name: 'Toots and The Maytals' }), new Artist({ name: 'Dua Lipa' }), new Artist({ name: 'Jorja Smith' }), new Artist({ name: 'Loquillo' }), new Artist({ name: 'Camila Cabello' }), new Artist({ name: 'Kanye West' }), new Artist({ name: 'Shakira' }), new Artist({ name: 'Pablo López' }), new Artist({ name: 'Luis Fonsi' }), new Artist({ name: 'Kase.O' }), new Artist({ name: 'Mala Rodríguez' }), new Artist({ name: 'Beyoncé' }), new Artist({ name: 'Rihanna' }), new Artist({ name: 'Mika' }), new Artist({ name: 'Billie Eilish' }), new Artist({ name: 'Macklemore' }), new Artist({ name: 'Thalía' }), new Artist({ name: 'PJ Harvey' }), new Artist({ name: 'The Cranberries' }), new Artist({ name: 'Pink Floyd' }), new Artist({ name: 'Amy Winehouse' }), new Artist({ name: 'Karol G' }), new Artist({ name: 'Leon Bridges' }), new Artist({ name: 'Maka' }), new Artist({ name: 'Loyle Carner' }), new Artist({ name: 'Julieta Venegas' }), new Artist({ name: 'Marc Anthony' }), new Artist({ name: 'Swan Fyahbwoy' }), new Artist({ name: 'Hempress Sativa' }), new Artist({ name: 'Rita Marley' }), new Artist({ name: 'Curtis Mayfield' }), new Artist({ name: 'Otis Redding' }), new Artist({ name: 'The Supremes' }), new Artist({ name: 'Jordan Rakei' }), new Artist({ name: 'Iseo & Dodosound' }), new Artist({ name: 'Conkarah' }), new Artist({ name: 'Hugh Mundell' }), new Artist({ name: 'Third World' }), new Artist({ name: 'Bruno Mars' }), new Artist({ name: 'Ed Sheeran' }), new Artist({ name: 'Oasis' }), new Artist({ name: 'Patti Smith' }), new Artist({ name: 'J Balvin' }), new Artist({ name: 'Alejandro Sanz' }), new Artist({ name: 'Fernando Costa' }), new Artist({ name: 'Travis Scott' }), new Artist({ name: 'Matisyahu' }), new Artist({ name: 'Twinkle Brothers' }), new Artist({ name: 'Stevie Wonder' }), new Artist({ name: 'Fontella Bass' }))

        songs.push(new Song({
            name: 'Is This Love',
            artists: artists[0]._id,
            file: '01 Is This Love.mp3'
        }), new Song({
            name: 'No Woman, No Cry',
            artists: artists[0]._id,
            file: '02 No Woman, No Cry [Live].mp3'
        }), new Song({
            name: 'Could You Be Loved',
            artists: artists[0]._id,
            file: '03 Could You Be Loved.mp3'
        }), new Song({
            name: 'Three Little Birds',
            artists: artists[0]._id,
            file: '04 Three Little Birds.mp3'
        }), new Song({
            name: 'Buffalo Soldier',
            artists: artists[0]._id,
            file: '05 Buffalo Soldier [Album Version].mp3'
        }), new Song({
            name: 'Get Up, Stand Up',
            artists: artists[0]._id,
            file: '06 Get Up, Stand Up [LP Version].mp3'
        }), new Song({
            name: 'Stir It Up',
            artists: artists[0]._id,
            file: '07 Stir It Up [Edit].mp3'
        }), new Song({
            name: 'One Love / People Get Ready',
            artists: artists[0]._id,
            file: '08 One Love-People Get Ready.mp3'
        }), new Song({
            name: 'I Shot the Sheriff',
            artists: artists[0]._id,
            file: '09 I Shot the Sheriff.mp3'
        }), new Song({
            name: 'Waiting in Vain',
            artists: artists[0]._id,
            file: '10 Waiting in Vain.mp3'
        }), new Song({
            name: 'Redemption Song',
            artists: artists[0]._id,
            file: '11 Redemption Song [Album Version].mp3'
        }), new Song({
            name: 'Satisfy My Soul',
            artists: artists[0]._id,
            file: '12 Satisfy My Soul.mp3'
        }), new Song({
            name: 'Exodus',
            artists: artists[0]._id,
            file: '13 Exodus.mp3'
        }), new Song({
            name: 'Jamming',
            artists: artists[0]._id,
            file: '14 Jamming.mp3'
        }), new Song({
            name: 'What\'s Going On',
            artists: artists[1]._id,
            file: ''
        }), new Song({
            name: 'What\'s Happening Brother',
            artists: artists[1]._id,
            file: ''
        }), new Song({
            name: 'Flyin\' High (In The Friendly Sky)',
            artists: artists[1]._id,
            file: ''
        }), new Song({
            name: 'Save The Children',
            artists: artists[1]._id,
            file: ''
        }), new Song({
            name: 'God Is Love',
            artists: artists[1]._id,
            file: ''
        }), new Song({
            name: 'Mercy Mercy Me (The Ecology)',
            artists: artists[1]._id,
            file: ''
        }), new Song({
            name: 'Right On',
            artists: artists[1]._id,
            file: ''
        }), new Song({
            name: 'Wholy Holy',
            artists: artists[1]._id,
            file: ''
        }), new Song({
            name: 'Inner City Blues (Make Me Wanna Holler)',
            artists: artists[1]._id,
            file: ''
        }), new Song({
            name: 'Respect',
            artists: artists[2]._id,
            file: '01 - Aretha Franklin - Respect.mp3'
        }), new Song({
            name: 'Drown In My Own Tears',
            artists: artists[2]._id,
            file: '02 - Aretha Franklin - Drown In My Own Tears.mp3'
        }), new Song({
            name: 'I Never Loved A Man (The Way I Love You)',
            artists: artists[2]._id,
            file: '03 - Aretha Franklin - I Never Loved A Man (The Way I Love You).mp3'
        }), new Song({
            name: 'Soul Serenade',
            artists: artists[2]._id,
            file: ''
        }), new Song({
            name: 'Don\'t Let Me Lose This Dream',
            artists: artists[2]._id,
            file: ''
        }), new Song({
            name: 'Baby Baby Baby',
            artists: artists[2]._id,
            file: ''
        }), new Song({
            name: 'Dr. Feelgood (Love is a Serious Business)',
            artists: artists[2]._id,
            file: ''
        }), new Song({
            name: 'Good Times',
            artists: artists[2]._id,
            file: ''
        }), new Song({
            name: 'Do Right Woman - Do Right Man',
            artists: artists[2]._id,
            file: ''
        }), new Song({
            name: 'Save Me',
            artists: artists[2]._id,
            file: ''
        }), new Song({
            name: 'Change Is Gonna Come',
            artists: artists[2]._id,
            file: ''
        }), new Song({
            name: 'American Idiot',
            artists: artists[3]._id,
            file: 'QTQQ.mp3'
        }), new Song({
            name: 'Jesus Of Suburbia',
            artists: artists[3]._id,
            file: 'WSGO.mp3'
        }), new Song({
            name: 'Holiday',
            artists: artists[3]._id,
            file: 'KFVP.mp3'
        }), new Song({
            name: 'Boulevard Of Broken Dreams',
            artists: artists[3]._id,
            file: ''
        }), new Song({
            name: 'Are We The Waiting',
            artists: artists[3]._id,
            file: ''
        }), new Song({
            name: 'St. Jimmy',
            artists: artists[3]._id,
            file: ''
        }), new Song({
            name: 'Give Me Novacaine',
            artists: artists[3]._id,
            file: ''
        }), new Song({
            name: 'She\'s A Rebel',
            artists: artists[3]._id,
            file: ''
        }), new Song({
            name: 'Extraordinary Girl',
            artists: artists[3]._id,
            file: ''
        }), new Song({
            name: 'Letterbomb',
            artists: artists[3]._id,
            file: ''
        }), new Song({
            name: 'Wake Me Up When September Ends',
            artists: artists[3]._id,
            file: ''
        }), new Song({
            name: 'Homecoming',
            artists: artists[3]._id,
            file: ''
        }), new Song({
            name: 'Whatsername',
            artists: artists[3]._id,
            file: ''
        }), new Song({
            name: 'Welcome To The Jungle',
            artists: artists[4]._id,
            file: '1. Welcome To The Jungle.mp3'
        }), new Song({
            name: 'It\'s So Easy',
            artists: artists[4]._id,
            file: '2. It\'s So Easy.mp3'
        }), new Song({
            name: 'Nightrain',
            artists: artists[4]._id,
            file: ''
        }), new Song({
            name: 'Out Ta Get Me',
            artists: artists[4]._id,
            file: ''
        }), new Song({
            name: 'Mr. Brownstone',
            artists: artists[4]._id,
            file: ''
        }), new Song({
            name: 'Paradise City',
            artists: artists[4]._id,
            file: ''
        }), new Song({
            name: 'My Michelle',
            artists: artists[4]._id,
            file: ''
        }), new Song({
            name: 'Think About You',
            artists: artists[4]._id,
            file: ''
        }), new Song({
            name: 'Sweet Child O\' Mine',
            artists: artists[4]._id,
            file: '9. Sweet Child O\' Mine.mp3'
        }), new Song({
            name: 'You\'re Crazy',
            artists: artists[4]._id,
            file: ''
        }), new Song({
            name: 'Anything Goes',
            artists: artists[4]._id,
            file: ''
        }), new Song({
            name: 'Rocket Queen',
            artists: artists[4]._id,
            file: ''
        }), new Song({
            name: 'One More Night',
            artists: artists[5]._id,
            file: '01 - One More Night.mp3'
        }), new Song({
            name: 'Payphone',
            artists: artists[5]._id,
            file: '02 - Payphone.mp3'
        }), new Song({
            name: 'Daylight',
            artists: artists[5]._id,
            file: '03 - Daylight.mp3'
        }), new Song({
            name: 'Lucky Strike',
            artists: artists[5]._id,
            file: ''
        }), new Song({
            name: 'The Man Who Never Lied',
            artists: artists[5]._id,
            file: ''
        }), new Song({
            name: 'Love Somebody',
            artists: artists[5]._id,
            file: ''
        }), new Song({
            name: 'Ladykiller',
            artists: artists[5]._id,
            file: ''
        }), new Song({
            name: 'Fortune Teller',
            artists: artists[5]._id,
            file: ''
        }), new Song({
            name: 'Sad',
            artists: artists[5]._id,
            file: ''
        }), new Song({
            name: 'Tickets',
            artists: artists[5]._id,
            file: ''
        }), new Song({
            name: 'Doin\' Dirt',
            artists: artists[5]._id,
            file: ''
        }), new Song({
            name: 'Beautiful Goodbye',
            artists: artists[5]._id,
            file: ''
        }), new Song({
            name: 'London Calling',
            artists: artists[6]._id,
            file: '01 - The Clash - London Calling.mp3'
        }), new Song({
            name: 'Brand New Cadillac',
            artists: artists[6]._id,
            file: '02 - The Clash - Brand New Cadillac.mp3'
        }), new Song({
            name: 'Jimmy Jazz',
            artists: artists[6]._id,
            file: '03 - The Clash - Jimmy Jazz.mp3'
        }), new Song({
            name: 'Hateful',
            artists: artists[6]._id,
            file: ''
        }), new Song({
            name: 'Rudie Can\'t Fail',
            artists: artists[6]._id,
            file: ''
        }), new Song({
            name: 'Spanish Bombs',
            artists: artists[6]._id,
            file: ''
        }), new Song({
            name: 'The Right Profile',
            artists: artists[6]._id,
            file: ''
        }), new Song({
            name: 'Lost in the Supermarket',
            artists: artists[6]._id,
            file: ''
        }), new Song({
            name: 'Clampdown',
            artists: artists[6]._id,
            file: ''
        }), new Song({
            name: 'The Guns of Brixton',
            artists: artists[6]._id,
            file: ''
        }), new Song({
            name: 'Wrong\'Em Boyo ',
            artists: artists[6]._id,
            file: ''
        }), new Song({
            name: 'Death or Glory',
            artists: artists[6]._id,
            file: ''
        }), new Song({
            name: 'Koka Kola',
            artists: artists[6]._id,
            file: ''
        }), new Song({
            name: 'The Card Cheat',
            artists: artists[6]._id,
            file: ''
        }), new Song({
            name: 'Lover\'s Rock',
            artists: artists[6]._id,
            file: ''
        }), new Song({
            name: 'Four Horsemen',
            artists: artists[6]._id,
            file: ''
        }), new Song({
            name: 'I\'m Not Down',
            artists: artists[6]._id,
            file: ''
        }), new Song({
            name: 'Revolution Rock',
            artists: artists[6]._id,
            file: ''
        }), new Song({
            name: 'Train in Vain (Stand by Me)',
            artists: artists[6]._id,
            file: ''
        }), new Song({
            name: 'Roxane',
            artists: artists[7]._id,
            file: 'Roxane.mp3'
        }), new Song({
            name: 'Cant\'t Stand Losing You',
            artists: artists[7]._id,
            file: ''
        }), new Song({
            name: 'So Lonely',
            artists: artists[7]._id,
            file: ''
        }), new Song({
            name: 'Message in a Bottle',
            artists: artists[7]._id,
            file: ''
        }), new Song({
            name: 'Walking on the Moon',
            artists: artists[7]._id,
            file: 'Walking_on_the_moon.mp3'
        }), new Song({
            name: 'Don\'t Stand so Close to Me',
            artists: artists[7]._id,
            file: ''
        }), new Song({
            name: 'De Do Do Do De Da Da Da',
            artists: artists[7]._id,
            file: ''
        }), new Song({
            name: 'Every Little Thing She Does is Magic',
            artists: artists[7]._id,
            file: ''
        }), new Song({
            name: 'Invisible Sun',
            artists: artists[7]._id,
            file: ''
        }), new Song({
            name: 'Spirits in the Material World',
            artists: artists[7]._id,
            file: ''
        }), new Song({
            name: 'Every Breath You Take',
            artists: artists[7]._id,
            file: 'Every_breath_you_take.mp3'
        }), new Song({
            name: 'King of Pain',
            artists: artists[7]._id,
            file: ''
        }), new Song({
            name: 'Wrapped Around Your Finger',
            artists: artists[7]._id,
            file: ''
        }), new Song({
            name: 'Dulce Intoducción al Caos',
            artists: artists[8]._id,
            file: ''
        }), new Song({
            name: 'Primer Movimiento: el Sueño',
            artists: artists[8]._id,
            file: ''
        }), new Song({
            name: 'Segundo Movimiento: lo de Fuera',
            artists: artists[8]._id,
            file: ''
        }), new Song({
            name: 'Tercer Movimiento: lo de Dentro',
            artists: artists[8]._id,
            file: ''
        }), new Song({
            name: 'Cuarto Movimiento: la Realidad',
            artists: artists[8]._id,
            file: ''
        }), new Song({
            name: 'Coda Flamenca (Otra Realidad)',
            artists: artists[8]._id,
            file: ''
        }), new Song({
            name: 'Malamente - Cap.1: Augurio',
            artists: artists[9]._id,
            file: ''
        }), new Song({
            name: 'Que No Salga la Luna - Cap.2: Boda',
            artists: artists[9]._id,
            file: ''
        }), new Song({
            name: 'Pienso en tu Mirá - Cap.3: Celos',
            artists: artists[9]._id,
            file: ''
        }), new Song({
            name: 'De Aquí No Sales - Cap.4: Disputa',
            artists: artists[9]._id,
            file: ''
        }), new Song({
            name: 'Reniengo - Cap.5: Lamento',
            artists: artists[9]._id,
            file: ''
        }), new Song({
            name: 'Preso - Cap.6: Clausura',
            artists: artists[9]._id,
            file: ''
        }), new Song({
            name: 'Bagdad - Cap.7: Liturgia',
            artists: artists[9]._id,
            file: ''
        }), new Song({
            name: 'Di Mi Nombre - Cap.8: Éxtasis',
            artists: artists[9]._id,
            file: ''
        }), new Song({
            name: 'Nana - Cap.9: Concepción',
            artists: artists[9]._id,
            file: ''
        }), new Song({
            name: 'Maldición - Cap.10: Cordura',
            artists: artists[9]._id,
            file: ''
        }), new Song({
            name: 'A Ningún Hombre - Cap.11: Poder',
            artists: artists[9]._id,
            file: ''
        }), new Song({
            name: 'Ámame',
            artists: artists[10]._id,
            file: ''
        }), new Song({
            name: 'Para Tu Amor',
            artists: artists[10]._id,
            file: ''
        }), new Song({
            name: 'Sueños',
            artists: artists[10]._id,
            file: ''
        }), new Song({
            name: 'La Camisa Negra',
            artists: artists[10]._id,
            file: ''
        }), new Song({
            name: 'Nada Valgo Sin Tu Amor',
            artists: artists[10]._id,
            file: ''
        }), new Song({
            name: 'No Siento Penas',
            artists: artists[10]._id,
            file: ''
        }), new Song({
            name: 'Dámelo',
            artists: artists[10]._id,
            file: ''
        }), new Song({
            name: 'Lo Que Me Gusta A Mi',
            artists: artists[10]._id,
            file: ''
        }), new Song({
            name: 'Rosario Tijeras',
            artists: artists[10]._id,
            file: ''
        }), new Song({
            name: '¿Qué Pasa?',
            artists: artists[10]._id,
            file: ''
        }), new Song({
            name: 'Volverte A Ver',
            artists: artists[10]._id,
            file: ''
        }), new Song({
            name: 'Tu Guardián',
            artists: artists[10]._id,
            file: ''
        }), new Song({
            name: 'Wanna Be Startin\'Somethin\'',
            artists: artists[11]._id,
            file: ''
        }), new Song({
            name: 'Baby Be Mine',
            artists: artists[11]._id,
            file: ''
        }), new Song({
            name: 'The Girl Is Mine',
            artists: artists[11]._id,
            file: ''
        }), new Song({
            name: 'Thriller',
            artists: artists[11]._id,
            file: ''
        }), new Song({
            name: 'Beat It',
            artists: artists[11]._id,
            file: ''
        }), new Song({
            name: 'Billie Jean',
            artists: artists[11]._id,
            file: ''
        }), new Song({
            name: 'Human Nature',
            artists: artists[11]._id,
            file: ''
        }), new Song({
            name: 'P.Y.T. (Pretty Young Thing)',
            artists: artists[11]._id,
            file: ''
        }), new Song({
            name: 'The Lady in My Life',
            artists: artists[11]._id,
            file: ''
        }), new Song({
            name: 'Filosofía y letras',
            artists: artists[12]._id,
            file: ''
        }), new Song({
            name: 'Asómate',
            artists: artists[12]._id,
            file: ''
        }), new Song({
            name: 'Pura droga sin cortar',
            artists: artists[12]._id,
            file: ''
        }), new Song({
            name: 'Información planta calle',
            artists: artists[12]._id,
            file: ''
        }), new Song({
            name: 'A las cosas por su nombre',
            artists: artists[12]._id,
            file: ''
        }), new Song({
            name: 'Nada más',
            artists: artists[12]._id,
            file: ''
        }), new Song({
            name: 'Resistencia arrogante',
            artists: artists[12]._id,
            file: ''
        }), new Song({
            name: 'Ocho líneas',
            artists: artists[12]._id,
            file: ''
        }), new Song({
            name: 'Cantando',
            artists: artists[12]._id,
            file: ''
        }), new Song({
            name: 'Alergia',
            artists: artists[12]._id,
            file: ''
        }), new Song({
            name: 'Vivir para contarlo',
            artists: artists[12]._id,
            file: ''
        }), new Song({
            name: 'No somos ciegos',
            artists: artists[12]._id,
            file: ''
        }), new Song({
            name: 'Zombis',
            artists: artists[12]._id,
            file: ''
        }), new Song({
            name: 'Dale tiempo al rumor',
            artists: artists[12]._id,
            file: ''
        }), new Song({
            name: 'The Ringer',
            artists: artists[13]._id,
            file: ''
        }), new Song({
            name: 'Greatest',
            artists: artists[13]._id,
            file: ''
        }), new Song({
            name: 'Lucky You',
            artists: artists[13]._id,
            file: ''
        }), new Song({
            name: 'Paul (Skit)',
            artists: artists[13]._id,
            file: ''
        }), new Song({
            name: 'Normal',
            artists: artists[13]._id,
            file: ''
        }), new Song({
            name: 'Em Calls Paul (Skit)',
            artists: artists[13]._id,
            file: ''
        }), new Song({
            name: 'Stepping Stone',
            artists: artists[13]._id,
            file: ''
        }), new Song({
            name: 'Not Alike',
            artists: artists[13]._id,
            file: ''
        }), new Song({
            name: 'Kamikaze',
            artists: artists[13]._id,
            file: ''
        }), new Song({
            name: 'Fall',
            artists: artists[13]._id,
            file: ''
        }), new Song({
            name: 'Nice Guy',
            artists: artists[13]._id,
            file: ''
        }), new Song({
            name: 'Good Guy',
            artists: artists[13]._id,
            file: ''
        }), new Song({
            name: 'Venom (Music From The Motion Picture)',
            artists: artists[13]._id,
            file: ''
        }), new Song({
            name: 'Leyenda',
            artists: artists[14]._id,
            file: ''
        }), new Song({
            name: 'El Hip-Hop Que Sé',
            artists: artists[14]._id,
            file: ''
        }), new Song({
            name: 'Adiós España - Trondosh',
            artists: artists[14]._id,
            file: ''
        }), new Song({
            name: 'Abrázate - Gema',
            artists: artists[14]._id,
            file: ''
        }), new Song({
            name: 'Tantas Razones',
            artists: artists[14]._id,
            file: ''
        }), new Song({
            name: 'Urbanología',
            artists: artists[14]._id,
            file: ''
        }), new Song({
            name: 'Anticuerpos - Rayden',
            artists: artists[14]._id,
            file: ''
        }), new Song({
            name: 'Ahora - Fyahbwoy',
            artists: artists[14]._id,
            file: ''
        }), new Song({
            name: 'Gratis',
            artists: artists[14]._id,
            file: ''
        }), new Song({
            name: 'Entre El Placer Y El Dolor - Santiuve',
            artists: artists[14]._id,
            file: ''
        }), new Song({
            name: 'Rap Español',
            artists: artists[14]._id,
            file: ''
        }), new Song({
            name: 'Tal Como Eres - Andrés Suárez, Sharif',
            artists: artists[14]._id,
            file: ''
        }), new Song({
            name: 'Ellos Y Yo - Samuel O\'Kane',
            artists: artists[14]._id,
            file: ''
        }), new Song({
            name: 'Poesía De Guerra',
            artists: artists[14]._id,
            file: ''
        }), new Song({
            name: 'Viviendo',
            artists: artists[14]._id,
            file: ''
        }), new Song({
            name: 'Movin (To the Top)',
            artists: artists[15]._id,
            file: ''
        }), new Song({
            name: 'Africa',
            artists: artists[15]._id,
            file: ''
        }), new Song({
            name: 'Fight the Revolution',
            artists: artists[15]._id,
            file: ''
        }), new Song({
            name: 'Civilized',
            artists: artists[15]._id,
            file: ''
        }), new Song({
            name: 'Guide Us (Jah Jah oh Jah Jah)',
            artists: artists[15]._id,
            file: ''
        }), new Song({
            name: '7 Days a Week',
            artists: artists[15]._id,
            file: ''
        }), new Song({
            name: 'Sunshine',
            artists: artists[15]._id,
            file: ''
        }), new Song({
            name: 'Baby you Know',
            artists: artists[15]._id,
            file: ''
        }), new Song({
            name: 'Holiday',
            artists: artists[15]._id,
            file: ''
        }), new Song({
            name: 'Time',
            artists: artists[15]._id,
            file: ''
        }), new Song({
            name: 'Come Let\'s Party',
            artists: artists[15]._id,
            file: ''
        }), new Song({
            name: 'Hotty Totty (Fast Lane)',
            artists: artists[15]._id,
            file: ''
        }), new Song({
            name: 'You\'ve Changed',
            artists: artists[15]._id,
            file: ''
        }), new Song({
            name: 'Cuídate',
            artists: artists[16]._id,
            file: ''
        }), new Song({
            name: 'Soledad',
            artists: artists[16]._id,
            file: ''
        }), new Song({
            name: 'Paris',
            artists: artists[16]._id,
            file: ''
        }), new Song({
            name: 'La Playa',
            artists: artists[16]._id,
            file: ''
        }), new Song({
            name: 'Pop',
            artists: artists[16]._id,
            file: ''
        }), new Song({
            name: 'Dicen Que Dicen',
            artists: artists[16]._id,
            file: ''
        }), new Song({
            name: 'Mariposa',
            artists: artists[16]._id,
            file: ''
        }), new Song({
            name: 'La Chica del Gorro Azul',
            artists: artists[16]._id,
            file: ''
        }), new Song({
            name: 'Tu Pelo',
            artists: artists[16]._id,
            file: ''
        }), new Song({
            name: 'Tantas Cosas Que Contar',
            artists: artists[16]._id,
            file: ''
        }), new Song({
            name: 'Los Amantes del Círculo Polar',
            artists: artists[16]._id,
            file: ''
        }), new Song({
            name: 'Desde el Puerto',
            artists: artists[16]._id,
            file: ''
        }), new Song({
            name: 'Tic Tac',
            artists: artists[16]._id,
            file: ''
        }), new Song({
            name: 'Like a Prayer',
            artists: artists[17]._id,
            file: ''
        }), new Song({
            name: 'Express Yourself',
            artists: artists[17]._id,
            file: ''
        }), new Song({
            name: 'Love Song',
            artists: artists[17]._id,
            file: ''
        }), new Song({
            name: 'Till Death Do Us Part',
            artists: artists[17]._id,
            file: ''
        }), new Song({
            name: 'Promise to Try',
            artists: artists[17]._id,
            file: ''
        }), new Song({
            name: 'Cherish',
            artists: artists[17]._id,
            file: ''
        }), new Song({
            name: 'Dear Jessie',
            artists: artists[17]._id,
            file: ''
        }), new Song({
            name: 'Oh Father',
            artists: artists[17]._id,
            file: ''
        }), new Song({
            name: 'Keep It Together',
            artists: artists[17]._id,
            file: ''
        }), new Song({
            name: 'Pray for Spanish Eyes (LP version)',
            artists: artists[17]._id,
            file: ''
        }), new Song({
            name: 'Act of Contrition',
            artists: artists[17]._id,
            file: ''
        }), new Song({
            name: 'You\'re Gonna Get Yours',
            artists: artists[18]._id,
            file: ''
        }), new Song({
            name: 'Sophisticated Bitch',
            artists: artists[18]._id,
            file: ''
        }), new Song({
            name: 'Miuzi Weighs a Ton',
            artists: artists[18]._id,
            file: ''
        }), new Song({
            name: 'Timebomb',
            artists: artists[18]._id,
            file: ''
        }), new Song({
            name: 'Too Much Posse',
            artists: artists[18]._id,
            file: ''
        }), new Song({
            name: 'Rightstarter (Message to a Black Man)',
            artists: artists[18]._id,
            file: ''
        }), new Song({
            name: 'Public Enemy No. 1',
            artists: artists[18]._id,
            file: ''
        }), new Song({
            name: 'M.P.E.',
            artists: artists[18]._id,
            file: ''
        }), new Song({
            name: 'Yo! Bum Rush the Show',
            artists: artists[18]._id,
            file: ''
        }), new Song({
            name: 'Raise the Roof',
            artists: artists[18]._id,
            file: ''
        }), new Song({
            name: 'Megablast',
            artists: artists[18]._id,
            file: ''
        }), new Song({
            name: 'Terminator X Speaks With His Hands',
            artists: artists[18]._id,
            file: ''
        }), new Song({
            name: 'Intro',
            artists: artists[19]._id,
            file: ''
        }), new Song({
            name: 'Calma Pueblo',
            artists: artists[19]._id,
            file: ''
        }), new Song({
            name: 'Baile De Los Pobres',
            artists: artists[19]._id,
            file: ''
        }), new Song({
            name: 'La Vuelta Al Mundo',
            artists: artists[19]._id,
            file: ''
        }), new Song({
            name: 'La Bala',
            artists: artists[19]._id,
            file: ''
        }), new Song({
            name: 'Vamo\' A Portarnos Mal',
            artists: artists[19]._id,
            file: ''
        }), new Song({
            name: 'Latinoamérica',
            artists: artists[19]._id,
            file: ''
        }), new Song({
            name: 'Inter - En Annunakilandia',
            artists: artists[19]._id,
            file: ''
        }), new Song({
            name: 'Digo Lo Que Pienso',
            artists: artists[19]._id,
            file: ''
        }), new Song({
            name: 'Muerte En Hawaii',
            artists: artists[19]._id,
            file: ''
        }), new Song({
            name: 'Todo Se Mueve',
            artists: artists[19]._id,
            file: ''
        }), new Song({
            name: 'El Hormiguero',
            artists: artists[19]._id,
            file: ''
        }), new Song({
            name: 'Prepárame La Cena',
            artists: artists[19]._id,
            file: ''
        }), new Song({
            name: 'Outro',
            artists: artists[19]._id,
            file: ''
        }), new Song({
            name: 'Space Oddity',
            artists: artists[20]._id,
            file: ''
        }), new Song({
            name: 'Unwashed and Somewhat Slightly Dazed (2015 Remaster)',
            artists: artists[20]._id,
            file: ''
        }), new Song({
            name: 'Letter to Hermione (2015 Remaster)',
            artists: artists[20]._id,
            file: ''
        }), new Song({
            name: 'Cycgnet Committee (2015 Remaster)',
            artists: artists[20]._id,
            file: ''
        }), new Song({
            name: 'Janine (2015 Remaster)',
            artists: artists[20]._id,
            file: ''
        }), new Song({
            name: 'An Occasional Dream (2015 Remaster)',
            artists: artists[20]._id,
            file: ''
        }), new Song({
            name: 'Wild Eyed Boy from Freecloud (2015 Remaster)',
            artists: artists[20]._id,
            file: ''
        }), new Song({
            name: 'God Knows I\'m Good (2015 Remaster)',
            artists: artists[20]._id,
            file: ''
        }), new Song({
            name: 'Memory of a Free Festival (2015 Remaster)',
            artists: artists[20]._id,
            file: ''
        }), new Song({
            name: 'Sit Right Down',
            artists: artists[21]._id,
            file: ''
        }), new Song({
            name: 'Pomp and Pride',
            artists: artists[21]._id,
            file: ''
        }), new Song({
            name: 'Louie Louie',
            artists: artists[21]._id,
            file: ''
        }), new Song({
            name: 'I Can\'t Believe',
            artists: artists[21]._id,
            file: ''
        }), new Song({
            name: 'Redemption Song',
            artists: artists[21]._id,
            file: ''
        }), new Song({
            name: 'Daddy\'s Home',
            artists: artists[21]._id,
            file: ''
        }), new Song({
            name: 'Funky Kingston',
            artists: artists[21]._id,
            file: ''
        }), new Song({
            name: 'It Was Written Down',
            artists: artists[21]._id,
            file: ''
        }), new Song({
            name: 'Future Nostalgia',
            artists: artists[22]._id,
            file: ''
        }), new Song({
            name: 'Don\'t Start Now',
            artists: artists[22]._id,
            file: ''
        }), new Song({
            name: 'Cool',
            artists: artists[22]._id,
            file: ''
        }), new Song({
            name: 'Physical',
            artists: artists[22]._id,
            file: ''
        }), new Song({
            name: 'Levitating',
            artists: artists[22]._id,
            file: ''
        }), new Song({
            name: 'Pretty Please',
            artists: artists[22]._id,
            file: ''
        }), new Song({
            name: 'Hallucinate',
            artists: artists[22]._id,
            file: ''
        }), new Song({
            name: 'Love Again',
            artists: artists[22]._id,
            file: ''
        }), new Song({
            name: 'Break My Heart',
            artists: artists[22]._id,
            file: ''
        }), new Song({
            name: 'Good In Bed',
            artists: artists[22]._id,
            file: ''
        }), new Song({
            name: 'Boys Will Be Boys',
            artists: artists[22]._id,
            file: ''
        }), new Song({
            name: 'Premonition (Intro)',
            artists: artists[13]._id,
            file: ''
        }), new Song({
            name: 'Unaccommodating',
            artists: artists[13]._id,
            file: ''
        }), new Song({
            name: 'You Gon\' Learn',
            artists: artists[13]._id,
            file: ''
        }), new Song({
            name: 'Alfred (Interlude)',
            artists: artists[13]._id,
            file: ''
        }), new Song({
            name: 'Those Kinda Nights',
            artists: artists[13]._id,
            file: ''
        }), new Song({
            name: 'In Too Deep',
            artists: artists[13]._id,
            file: ''
        }), new Song({
            name: 'Godzilla',
            artists: artists[13]._id,
            file: ''
        }), new Song({
            name: 'Darkness',
            artists: artists[13]._id,
            file: ''
        }), new Song({
            name: 'Leaving Heaven',
            artists: artists[13]._id,
            file: ''
        }), new Song({
            name: 'Yah Yah',
            artists: artists[13]._id,
            file: ''
        }), new Song({
            name: 'Stepdad (Intro)',
            artists: artists[13]._id,
            file: ''
        }), new Song({
            name: 'Stepdad',
            artists: artists[13]._id,
            file: ''
        }), new Song({
            name: 'Marsh',
            artists: artists[13]._id,
            file: ''
        }), new Song({
            name: 'Never Love Again',
            artists: artists[13]._id,
            file: ''
        }), new Song({
            name: 'Little Engine',
            artists: artists[13]._id,
            file: ''
        }), new Song({
            name: 'Lock It Up',
            artists: artists[13]._id,
            file: ''
        }), new Song({
            name: 'Farewell',
            artists: artists[13]._id,
            file: ''
        }), new Song({
            name: 'No Regreats',
            artists: artists[13]._id,
            file: ''
        }), new Song({
            name: 'I Will',
            artists: artists[13]._id,
            file: ''
        }), new Song({
            name: 'Alfred (Outro)',
            artists: artists[13]._id,
            file: ''
        }), new Song({
            name: 'Lost & Found',
            artists: artists[23]._id,
            file: ''
        }), new Song({
            name: 'Teenage Fantasy',
            artists: artists[23]._id,
            file: ''
        }), new Song({
            name: 'Where Did I Go?',
            artists: artists[23]._id,
            file: ''
        }), new Song({
            name: 'February 3rd',
            artists: artists[23]._id,
            file: ''
        }), new Song({
            name: 'On Your Own',
            artists: artists[23]._id,
            file: ''
        }), new Song({
            name: 'The One',
            artists: artists[23]._id,
            file: ''
        }), new Song({
            name: 'Wandering Romance',
            artists: artists[23]._id,
            file: ''
        }), new Song({
            name: 'Blue Lights',
            artists: artists[23]._id,
            file: ''
        }), new Song({
            name: 'Lifeboats (Freestyle)',
            artists: artists[23]._id,
            file: ''
        }), new Song({
            name: 'Goodbyes',
            artists: artists[23]._id,
            file: ''
        }), new Song({
            name: 'Tomorrow',
            artists: artists[23]._id,
            file: ''
        }), new Song({
            name: 'Don\'t Watch Me Cry',
            artists: artists[23]._id,
            file: ''
        }), new Song({
            name: 'Los buscadores',
            artists: artists[24]._id,
            file: ''
        }), new Song({
            name: 'Somos lo que defendemos',
            artists: artists[24]._id,
            file: ''
        }), new Song({
            name: 'El último clásico',
            artists: artists[24]._id,
            file: ''
        }), new Song({
            name: 'Lo importante es amar',
            artists: artists[24]._id,
            file: ''
        }), new Song({
            name: 'Gafas de sol',
            artists: artists[24]._id,
            file: ''
        }), new Song({
            name: 'Los sonidos son ideas',
            artists: artists[24]._id,
            file: ''
        }), new Song({
            name: 'Como un nada',
            artists: artists[24]._id,
            file: ''
        }), new Song({
            name: 'Creo en mí',
            artists: artists[24]._id,
            file: ''
        }), new Song({
            name: 'La vampiresa del raval',
            artists: artists[24]._id,
            file: ''
        }), new Song({
            name: 'El resucitado',
            artists: artists[24]._id,
            file: ''
        }), new Song({
            name: 'Shameless',
            artists: artists[25]._id,
            file: ''
        }), new Song({
            name: 'Living Proof',
            artists: artists[25]._id,
            file: ''
        }), new Song({
            name: 'Should\'ve Said It',
            artists: artists[25]._id,
            file: ''
        }), new Song({
            name: 'My Oh My',
            artists: artists[25]._id,
            file: ''
        }), new Song({
            name: 'Señorita',
            artists: artists[25]._id,
            file: ''
        }), new Song({
            name: 'Liar',
            artists: artists[25]._id,
            file: ''
        }), new Song({
            name: 'Bad Kind of Butterflies',
            artists: artists[25]._id,
            file: ''
        }), new Song({
            name: 'Easy',
            artists: artists[25]._id,
            file: ''
        }), new Song({
            name: 'Feel It twice',
            artists: artists[25]._id,
            file: ''
        }), new Song({
            name: 'Dream of You',
            artists: artists[25]._id,
            file: ''
        }), new Song({
            name: 'Cry For Me',
            artists: artists[25]._id,
            file: ''
        }), new Song({
            name: 'This Love',
            artists: artists[25]._id,
            file: ''
        }), new Song({
            name: 'Used to This',
            artists: artists[25]._id,
            file: ''
        }), new Song({
            name: 'First Man',
            artists: artists[25]._id,
            file: ''
        }), new Song({
            name: 'Every Hour',
            artists: artists[26]._id,
            file: ''
        }), new Song({
            name: 'Selah',
            artists: artists[26]._id,
            file: ''
        }), new Song({
            name: 'Follow God',
            artists: artists[26]._id,
            file: ''
        }), new Song({
            name: 'Closed On Sunday',
            artists: artists[26]._id,
            file: ''
        }), new Song({
            name: 'On God',
            artists: artists[26]._id,
            file: ''
        }), new Song({
            name: 'Everything We Need',
            artists: artists[26]._id,
            file: ''
        }), new Song({
            name: 'Water',
            artists: artists[26]._id,
            file: ''
        }), new Song({
            name: 'God Is',
            artists: artists[26]._id,
            file: ''
        }), new Song({
            name: 'Hands On',
            artists: artists[26]._id,
            file: ''
        }), new Song({
            name: 'Use This Gospel',
            artists: artists[26]._id,
            file: ''
        }), new Song({
            name: 'Jesus Is Lord',
            artists: artists[26]._id,
            file: ''
        }), new Song({
            name: 'Me Enamoré',
            artists: artists[27]._id,
            file: ''
        }), new Song({
            name: 'Nada',
            artists: artists[27]._id,
            file: ''
        }), new Song({
            name: 'Chantaje',
            artists: artists[27]._id,
            file: ''
        }), new Song({
            name: 'When a Woman',
            artists: artists[27]._id,
            file: ''
        }), new Song({
            name: 'Amarillo',
            artists: artists[27]._id,
            file: ''
        }), new Song({
            name: 'Perro Fiel',
            artists: artists[27]._id,
            file: ''
        }), new Song({
            name: 'Trap',
            artists: artists[27]._id,
            file: ''
        }), new Song({
            name: 'Comme moi',
            artists: artists[27]._id,
            file: ''
        }), new Song({
            name: 'Coconut Tree',
            artists: artists[27]._id,
            file: ''
        }), new Song({
            name: 'La Bicicleta',
            artists: artists[27]._id,
            file: ''
        }), new Song({
            name: 'Deja vu',
            artists: artists[27]._id,
            file: ''
        }), new Song({
            name: 'What We Said (Comme moi English Version)',
            artists: artists[27]._id,
            file: ''
        }), new Song({
            name: 'Toneladas',
            artists: artists[27]._id,
            file: ''
        }), new Song({
            name: 'El Camino',
            artists: artists[28]._id,
            file: ''
        }), new Song({
            name: 'El Niño',
            artists: artists[28]._id,
            file: ''
        }), new Song({
            name: 'El Gato',
            artists: artists[28]._id,
            file: ''
        }), new Song({
            name: 'El Patio',
            artists: artists[28]._id,
            file: ''
        }), new Song({
            name: 'La Dobleuve',
            artists: artists[28]._id,
            file: ''
        }), new Song({
            name: 'El Incendio',
            artists: artists[28]._id,
            file: ''
        }), new Song({
            name: 'El Teléfono',
            artists: artists[28]._id,
            file: ''
        }), new Song({
            name: 'Lo Imposible',
            artists: artists[28]._id,
            file: ''
        }), new Song({
            name: 'El Futuro',
            artists: artists[28]._id,
            file: ''
        }), new Song({
            name: 'La Libertad',
            artists: artists[28]._id,
            file: ''
        }), new Song({
            name: 'Las 17:00',
            artists: artists[28]._id,
            file: ''
        }), new Song({
            name: 'Sola',
            artists: artists[29]._id,
            file: ''
        }), new Song({
            name: 'Apaga La Luz',
            artists: artists[29]._id,
            file: ''
        }), new Song({
            name: 'Le Pido Al Cielo',
            artists: artists[29]._id,
            file: ''
        }), new Song({
            name: 'Imposible',
            artists: artists[29]._id,
            file: ''
        }), new Song({
            name: 'Poco A Poco',
            artists: artists[29]._id,
            file: ''
        }), new Song({
            name: 'Dime Que No Te Iras',
            artists: artists[29]._id,
            file: ''
        }), new Song({
            name: 'Échame La Culpa',
            artists: artists[29]._id,
            file: ''
        }), new Song({
            name: 'Tanto Para Nada',
            artists: artists[29]._id,
            file: ''
        }), new Song({
            name: 'Despacito',
            artists: artists[29]._id,
            file: ''
        }), new Song({
            name: 'Más Fuerte Que Yo',
            artists: artists[29]._id,
            file: ''
        }), new Song({
            name: 'Calypso',
            artists: artists[29]._id,
            file: ''
        }), new Song({
            name: 'Ahí Estas Tú',
            artists: artists[29]._id,
            file: ''
        }), new Song({
            name: 'Despacito (Remix)',
            artists: artists[29]._id,
            file: ''
        }), new Song({
            name: 'Calypso (Remix)',
            artists: artists[29]._id,
            file: ''
        }), new Song({
            name: 'Sola (English Version)',
            artists: artists[29]._id,
            file: ''
        }), new Song({
            name: 'Intro (El círculo)',
            artists: artists[30]._id,
            file: ''
        }), new Song({
            name: 'Esto No para',
            artists: artists[30]._id,
            file: ''
        }), new Song({
            name: 'Yemen',
            artists: artists[30]._id,
            file: ''
        }), new Song({
            name: 'Triste',
            artists: artists[30]._id,
            file: ''
        }), new Song({
            name: 'Guapo Tarde',
            artists: artists[30]._id,
            file: ''
        }), new Song({
            name: 'Viejos Ciegos',
            artists: artists[30]._id,
            file: ''
        }), new Song({
            name: 'Interludio Quieren Copiar',
            artists: artists[30]._id,
            file: ''
        }), new Song({
            name: 'Pavos Reales',
            artists: artists[30]._id,
            file: ''
        }), new Song({
            name: 'Mitad y Mitad',
            artists: artists[30]._id,
            file: ''
        }), new Song({
            name: 'Mazas y Catapultas',
            artists: artists[30]._id,
            file: ''
        }), new Song({
            name: 'Amor Sin Cláusulas',
            artists: artists[30]._id,
            file: ''
        }), new Song({
            name: 'No Se Qué Voy a Hacer (Booty Song)',
            artists: artists[30]._id,
            file: ''
        }), new Song({
            name: 'Interludio Risoterapia',
            artists: artists[30]._id,
            file: ''
        }), new Song({
            name: 'Rap Superdotado',
            artists: artists[30]._id,
            file: ''
        }), new Song({
            name: 'Repartiendo Arte',
            artists: artists[30]._id,
            file: ''
        }), new Song({
            name: 'Basureta (Tiempos raros)',
            artists: artists[30]._id,
            file: ''
        }), new Song({
            name: 'Outro',
            artists: artists[30]._id,
            file: ''
        }), new Song({
            name: 'Esclavos',
            artists: artists[31]._id,
            file: ''
        }), new Song({
            name: 'Caja de madera',
            artists: artists[31]._id,
            file: ''
        }), new Song({
            name: '33',
            artists: artists[31]._id,
            file: ''
        }), new Song({
            name: 'Cuando tú me apagas',
            artists: artists[31]._id,
            file: ''
        }), new Song({
            name: 'Caliente',
            artists: artists[31]._id,
            file: ''
        }), new Song({
            name: 'Hazme caso',
            artists: artists[31]._id,
            file: ''
        }), new Song({
            name: 'Lluvia',
            artists: artists[31]._id,
            file: ''
        }), new Song({
            name: 'Dorothy',
            artists: artists[31]._id,
            file: ''
        }), new Song({
            name: 'La rata',
            artists: artists[31]._id,
            file: ''
        }), new Song({
            name: 'Quién manda',
            artists: artists[31]._id,
            file: ''
        }), new Song({
            name: 'Miedo a volar',
            artists: artists[31]._id,
            file: ''
        }), new Song({
            name: 'Ella',
            artists: artists[31]._id,
            file: ''
        }), new Song({
            name: 'Pray You Catch Me',
            artists: artists[32]._id,
            file: ''
        }), new Song({
            name: 'Hold Up',
            artists: artists[32]._id,
            file: ''
        }), new Song({
            name: 'Don\'t Hurt Yourself',
            artists: artists[32]._id,
            file: ''
        }), new Song({
            name: 'Sorry',
            artists: artists[32]._id,
            file: ''
        }), new Song({
            name: '6 Inch',
            artists: artists[32]._id,
            file: ''
        }), new Song({
            name: 'Daddy Lessons',
            artists: artists[32]._id,
            file: ''
        }), new Song({
            name: 'Love Drought',
            artists: artists[32]._id,
            file: ''
        }), new Song({
            name: 'Sandcastles',
            artists: artists[32]._id,
            file: ''
        }), new Song({
            name: 'Forward',
            artists: artists[32]._id,
            file: ''
        }), new Song({
            name: 'Freedom',
            artists: artists[32]._id,
            file: ''
        }), new Song({
            name: 'All Night',
            artists: artists[32]._id,
            file: ''
        }), new Song({
            name: 'Formation',
            artists: artists[32]._id,
            file: ''
        }), new Song({
            name: 'Consideration',
            artists: artists[33]._id,
            file: ''
        }), new Song({
            name: 'James Joint',
            artists: artists[33]._id,
            file: ''
        }), new Song({
            name: 'Kiss It Better',
            artists: artists[33]._id,
            file: ''
        }), new Song({
            name: 'Work',
            artists: artists[33]._id,
            file: ''
        }), new Song({
            name: 'Desesperado',
            artists: artists[33]._id,
            file: ''
        }), new Song({
            name: 'Woo',
            artists: artists[33]._id,
            file: ''
        }), new Song({
            name: 'Needed Me',
            artists: artists[33]._id,
            file: ''
        }), new Song({
            name: 'Yeah, I Said It',
            artists: artists[33]._id,
            file: ''
        }), new Song({
            name: 'Same Ol\' Mistakes',
            artists: artists[33]._id,
            file: ''
        }), new Song({
            name: 'Never Ending',
            artists: artists[33]._id,
            file: ''
        }), new Song({
            name: 'Love on the Brain',
            artists: artists[33]._id,
            file: ''
        }), new Song({
            name: 'Higher',
            artists: artists[33]._id,
            file: ''
        }), new Song({
            name: 'Close to You',
            artists: artists[33]._id,
            file: ''
        }), new Song({
            name: 'Tiny Love',
            artists: artists[34]._id,
            file: ''
        }), new Song({
            name: 'Ice Cream',
            artists: artists[34]._id,
            file: ''
        }), new Song({
            name: 'Dear Jealousy',
            artists: artists[34]._id,
            file: ''
        }), new Song({
            name: 'Paloma',
            artists: artists[34]._id,
            file: ''
        }), new Song({
            name: 'Sanremo',
            artists: artists[34]._id,
            file: ''
        }), new Song({
            name: 'Tomorrow',
            artists: artists[34]._id,
            file: ''
        }), new Song({
            name: 'Ready To Call This Love',
            artists: artists[34]._id,
            file: ''
        }), new Song({
            name: 'Cry',
            artists: artists[34]._id,
            file: ''
        }), new Song({
            name: 'Plataform Ballerinas',
            artists: artists[34]._id,
            file: ''
        }), new Song({
            name: 'I Went To Hell Last Night',
            artists: artists[34]._id,
            file: ''
        }), new Song({
            name: 'Blue',
            artists: artists[34]._id,
            file: ''
        }), new Song({
            name: 'Stay High',
            artists: artists[34]._id,
            file: ''
        }), new Song({
            name: 'Tiny Love Reprise',
            artists: artists[34]._id,
            file: ''
        }), new Song({
            name: '!!!!!!!!',
            artists: artists[35]._id,
            file: ''
        }), new Song({
            name: 'Bad Guy',
            artists: artists[35]._id,
            file: ''
        }), new Song({
            name: 'Xanny',
            artists: artists[35]._id,
            file: ''
        }), new Song({
            name: 'You Should See Me in a Crown',
            artists: artists[35]._id,
            file: ''
        }), new Song({
            name: 'All the Good Girls Go to Hell',
            artists: artists[35]._id,
            file: ''
        }), new Song({
            name: 'Wish You Were Guy',
            artists: artists[35]._id,
            file: ''
        }), new Song({
            name: 'When the Party\'s Over',
            artists: artists[35]._id,
            file: ''
        }), new Song({
            name: '8',
            artists: artists[35]._id,
            file: ''
        }), new Song({
            name: 'My Strange Addiction',
            artists: artists[35]._id,
            file: ''
        }), new Song({
            name: 'Buy a Friend',
            artists: artists[35]._id,
            file: ''
        }), new Song({
            name: 'Ilomilo',
            artists: artists[35]._id,
            file: ''
        }), new Song({
            name: 'Listen Before I Go',
            artists: artists[35]._id,
            file: ''
        }), new Song({
            name: 'I Love You',
            artists: artists[35]._id,
            file: ''
        }), new Song({
            name: 'Goodbye',
            artists: artists[35]._id,
            file: ''
        }), new Song({
            name: 'Ain\'t Gonna Die Tonight - Eric Nally',
            artists: artists[36]._id,
            file: ''
        }), new Song({
            name: 'Glorious - Skylar Grey',
            artists: artists[36]._id,
            file: ''
        }), new Song({
            name: 'Marmalade - Lil Yachty',
            artists: artists[36]._id,
            file: ''
        }), new Song({
            name: 'Willy Wonka [Clean] - Offset',
            artists: artists[36]._id,
            file: ''
        }), new Song({
            name: 'Intentions - Dan Caplen ',
            artists: artists[36]._id,
            file: ''
        }), new Song({
            name: 'Good Old Days - Kesha',
            artists: artists[36]._id,
            file: ''
        }), new Song({
            name: 'Levitate - Otieno Terry',
            artists: artists[36]._id,
            file: ''
        }), new Song({
            name: 'Firebreather - Reignwolf',
            artists: artists[36]._id,
            file: ''
        }), new Song({
            name: 'How To Play the Flute - King Draino',
            artists: artists[36]._id,
            file: ''
        }), new Song({
            name: 'Ten Milion',
            artists: artists[36]._id,
            file: ''
        }), new Song({
            name: 'Over It - Donna Missal',
            artists: artists[36]._id,
            file: ''
        }), new Song({
            name: 'Zara - Abir',
            artists: artists[36]._id,
            file: ''
        }), new Song({
            name: 'Corner STore [Clean] - Travis Thompson, Dave B.',
            artists: artists[36]._id,
            file: ''
        }), new Song({
            name: 'Miracle - Dan Caplen',
            artists: artists[36]._id,
            file: ''
        }), new Song({
            name: 'Church - Xperience',
            artists: artists[36]._id,
            file: ''
        }), new Song({
            name: 'Excavate - Saint Claire',
            artists: artists[36]._id,
            file: ''
        }), new Song({
            name: 'No Me Acuerdo',
            artists: artists[37]._id,
            file: ''
        }), new Song({
            name: 'Lindo Pero Bruto',
            artists: artists[37]._id,
            file: ''
        }), new Song({
            name: 'Lento',
            artists: artists[37]._id,
            file: ''
        }), new Song({
            name: 'Sube, Sube',
            artists: artists[37]._id,
            file: ''
        }), new Song({
            name: 'Tú Me Sientas Tan Bien',
            artists: artists[37]._id,
            file: ''
        }), new Song({
            name: 'Vamos Órale',
            artists: artists[37]._id,
            file: ''
        }), new Song({
            name: 'Ahí',
            artists: artists[37]._id,
            file: ''
        }), new Song({
            name: 'Corazón Valiente',
            artists: artists[37]._id,
            file: ''
        }), new Song({
            name: 'Qué Ironía',
            artists: artists[37]._id,
            file: ''
        }), new Song({
            name: 'Por Amor Al Arte',
            artists: artists[37]._id,
            file: ''
        }), new Song({
            name: 'Ay Amor',
            artists: artists[37]._id,
            file: ''
        }), new Song({
            name: 'Vikingo',
            artists: artists[37]._id,
            file: ''
        }), new Song({
            name: 'Me Oyen, Me Escuchan',
            artists: artists[37]._id,
            file: ''
        }), new Song({
            name: 'Big Exit',
            artists: artists[38]._id,
            file: ''
        }), new Song({
            name: 'Good Fortune',
            artists: artists[38]._id,
            file: ''
        }), new Song({
            name: 'A Place Called Home',
            artists: artists[38]._id,
            file: ''
        }), new Song({
            name: 'One Line',
            artists: artists[38]._id,
            file: ''
        }), new Song({
            name: 'Beautiful Feeling',
            artists: artists[38]._id,
            file: ''
        }), new Song({
            name: 'The Whores Hustle And The Hustlers Whore',
            artists: artists[38]._id,
            file: ''
        }), new Song({
            name: 'This Mess We\'re In',
            artists: artists[38]._id,
            file: ''
        }), new Song({
            name: 'You Said Something',
            artists: artists[38]._id,
            file: ''
        }), new Song({
            name: 'Kaimkaze',
            artists: artists[38]._id,
            file: ''
        }), new Song({
            name: 'This Is Love',
            artists: artists[38]._id,
            file: ''
        }), new Song({
            name: 'Horses In My Dreams',
            artists: artists[38]._id,
            file: ''
        }), new Song({
            name: 'We Float',
            artists: artists[38]._id,
            file: ''
        }), new Song({
            name: 'Linger',
            artists: artists[39]._id,
            file: ''
        }), new Song({
            name: 'The Glory',
            artists: artists[39]._id,
            file: ''
        }), new Song({
            name: 'Dreams',
            artists: artists[39]._id,
            file: ''
        }), new Song({
            name: 'When You\'re Gone',
            artists: artists[39]._id,
            file: ''
        }), new Song({
            name: 'Zombie',
            artists: artists[39]._id,
            file: ''
        }), new Song({
            name: 'Ridiculous Thoughts',
            artists: artists[39]._id,
            file: ''
        }), new Song({
            name: 'Rupture',
            artists: artists[39]._id,
            file: ''
        }), new Song({
            name: 'Ode to My Family',
            artists: artists[39]._id,
            file: ''
        }), new Song({
            name: 'Free to Decide',
            artists: artists[39]._id,
            file: ''
        }), new Song({
            name: 'Just My Imagination',
            artists: artists[39]._id,
            file: ''
        }), new Song({
            name: 'Animal Instinct',
            artists: artists[39]._id,
            file: ''
        }), new Song({
            name: 'You & Me',
            artists: artists[39]._id,
            file: ''
        }), new Song({
            name: 'Why?',
            artists: artists[39]._id,
            file: ''
        }), new Song({
            name: 'Shine On You Crazy Diamond (Parts I-V)',
            artists: artists[40]._id,
            file: ''
        }), new Song({
            name: 'Welcome to the Machine',
            artists: artists[40]._id,
            file: ''
        }), new Song({
            name: 'Have a Cigar',
            artists: artists[40]._id,
            file: ''
        }), new Song({
            name: 'Wish You Were Here',
            artists: artists[40]._id,
            file: ''
        }), new Song({
            name: 'Shine On You Crazy Diamond (Part Two)',
            artists: artists[40]._id,
            file: ''
        }), new Song({
            name: 'Rehab',
            artists: artists[41]._id,
            file: ''
        }), new Song({
            name: 'You Know I\'m No Good',
            artists: artists[41]._id,
            file: ''
        }), new Song({
            name: 'Me & Mr Jones',
            artists: artists[41]._id,
            file: ''
        }), new Song({
            name: 'Just Friends',
            artists: artists[41]._id,
            file: ''
        }), new Song({
            name: 'Back to Black',
            artists: artists[41]._id,
            file: ''
        }), new Song({
            name: 'Love Is a Losing Game',
            artists: artists[41]._id,
            file: ''
        }), new Song({
            name: 'Tears Dry on Their Own',
            artists: artists[41]._id,
            file: ''
        }), new Song({
            name: 'Wake Up Alone',
            artists: artists[41]._id,
            file: ''
        }), new Song({
            name: 'Some Unholy War',
            artists: artists[41]._id,
            file: ''
        }), new Song({
            name: 'He Can Only Hold Her',
            artists: artists[41]._id,
            file: ''
        }), new Song({
            name: 'Addicted',
            artists: artists[41]._id,
            file: ''
        }), new Song({
            name: 'Ocean',
            artists: artists[42]._id,
            file: ''
        }), new Song({
            name: 'Punto G',
            artists: artists[42]._id,
            file: ''
        }), new Song({
            name: 'Love With A Quality - Damian Marley',
            artists: artists[42]._id,
            file: ''
        }), new Song({
            name: 'Baby',
            artists: artists[42]._id,
            file: ''
        }), new Song({
            name: 'Sin Corazón',
            artists: artists[42]._id,
            file: ''
        }), new Song({
            name: 'Dices Que Te Vas',
            artists: artists[42]._id,
            file: ''
        }), new Song({
            name: 'Pineapple',
            artists: artists[42]._id,
            file: ''
        }), new Song({
            name: 'La Vida Continuó - Simone & Simaria',
            artists: artists[42]._id,
            file: ''
        }), new Song({
            name: 'Bebesita',
            artists: artists[42]._id,
            file: ''
        }), new Song({
            name: 'Culpables - Anuel AA',
            artists: artists[42]._id,
            file: ''
        }), new Song({
            name: 'Mi Cama',
            artists: artists[42]._id,
            file: ''
        }), new Song({
            name: 'La Ocasión Perfecta - Yandel',
            artists: artists[42]._id,
            file: ''
        }), new Song({
            name: 'Créeme - Maluma',
            artists: artists[42]._id,
            file: ''
        }), new Song({
            name: 'Go Karo',
            artists: artists[42]._id,
            file: ''
        }), new Song({
            name: 'Mi Cama - Remix - J Balvin, Nicky Jam',
            artists: artists[42]._id,
            file: ''
        }), new Song({
            name: 'Yo Aprendí - Danay Suárez',
            artists: artists[42]._id,
            file: ''
        }), new Song({
            name: 'Bet Ain\'t Worth the Hand',
            artists: artists[43]._id,
            file: ''
        }), new Song({
            name: 'Bad Bad News',
            artists: artists[43]._id,
            file: ''
        }), new Song({
            name: 'Shy',
            artists: artists[43]._id,
            file: ''
        }), new Song({
            name: 'Beyond',
            artists: artists[43]._id,
            file: ''
        }), new Song({
            name: 'Forigve You',
            artists: artists[43]._id,
            file: ''
        }), new Song({
            name: 'Lions',
            artists: artists[43]._id,
            file: ''
        }), new Song({
            name: 'If It Feels Good (Then It Must Be)',
            artists: artists[43]._id,
            file: ''
        }), new Song({
            name: 'You Don\'t Know',
            artists: artists[43]._id,
            file: ''
        }), new Song({
            name: 'Mrs.',
            artists: artists[43]._id,
            file: ''
        }), new Song({
            name: 'Georgia to Texas',
            artists: artists[43]._id,
            file: ''
        }), new Song({
            name: 'Forever',
            artists: artists[44]._id,
            file: ''
        }), new Song({
            name: 'Lagos',
            artists: artists[44]._id,
            file: ''
        }), new Song({
            name: 'FMH',
            artists: artists[44]._id,
            file: ''
        }), new Song({
            name: 'Circle',
            artists: artists[44]._id,
            file: ''
        }), new Song({
            name: 'Mu Na Gi',
            artists: artists[44]._id,
            file: ''
        }), new Song({
            name: 'Good Time',
            artists: artists[44]._id,
            file: ''
        }), new Song({
            name: 'Roll Call',
            artists: artists[44]._id,
            file: ''
        }), new Song({
            name: 'Dear Jean',
            artists: artists[45]._id,
            file: ''
        }), new Song({
            name: 'Angel - Tom Misch',
            artists: artists[45]._id,
            file: ''
        }), new Song({
            name: 'Ice Water',
            artists: artists[45]._id,
            file: ''
        }), new Song({
            name: 'Ottolenghi - Jordan Rakei',
            artists: artists[45]._id,
            file: ''
        }), new Song({
            name: 'You Don\'t Know - Rebel Kelff, Kiko Bun',
            artists: artists[45]._id,
            file: ''
        }), new Song({
            name: 'Still',
            artists: artists[45]._id,
            file: ''
        }), new Song({
            name: 'It\'s Coming Home?',
            artists: artists[45]._id,
            file: ''
        }), new Song({
            name: 'Desoleii (Brilliant Corners) - Sampha',
            artists: artists[45]._id,
            file: ''
        }), new Song({
            name: 'Loose Ends - Jorja Smith',
            artists: artists[45]._id,
            file: ''
        }), new Song({
            name: 'Not Waving, But Drowning',
            artists: artists[45]._id,
            file: ''
        }), new Song({
            name: 'Krispy',
            artists: artists[45]._id,
            file: ''
        }), new Song({
            name: 'Sail Away Freestyle',
            artists: artists[45]._id,
            file: ''
        }), new Song({
            name: 'Looking Back',
            artists: artists[45]._id,
            file: ''
        }), new Song({
            name: 'Carluccio',
            artists: artists[45]._id,
            file: ''
        }), new Song({
            name: 'Dear Ben - Jean Coyle - Larner',
            artists: artists[45]._id,
            file: ''
        }), new Song({
            name: 'Alma Radiante',
            artists: artists[46]._id,
            file: ''
        }), new Song({
            name: 'Aire en Movimiento',
            artists: artists[46]._id,
            file: ''
        }), new Song({
            name: 'Podría Ser',
            artists: artists[46]._id,
            file: ''
        }), new Song({
            name: 'Hermano Japonés',
            artists: artists[46]._id,
            file: ''
        }), new Song({
            name: 'Lactancia Infantil',
            artists: artists[46]._id,
            file: ''
        }), new Song({
            name: 'Gente Decente',
            artists: artists[46]._id,
            file: ''
        }), new Song({
            name: 'Mis Muertos',
            artists: artists[46]._id,
            file: ''
        }), new Song({
            name: 'Seguiré Viva',
            artists: artists[46]._id,
            file: ''
        }), new Song({
            name: 'Introducción',
            artists: artists[46]._id,
            file: ''
        }), new Song({
            name: 'Parecen Viernes',
            artists: artists[47]._id,
            file: ''
        }), new Song({
            name: 'Tu Vida en la Mía',
            artists: artists[47]._id,
            file: ''
        }), new Song({
            name: 'Un Amor Eterno',
            artists: artists[47]._id,
            file: ''
        }), new Song({
            name: 'Si Me Creyeras',
            artists: artists[47]._id,
            file: ''
        }), new Song({
            name: 'Soy Yo',
            artists: artists[47]._id,
            file: ''
        }), new Song({
            name: 'Lo Que Te Di',
            artists: artists[47]._id,
            file: ''
        }), new Song({
            name: 'Úsame',
            artists: artists[47]._id,
            file: ''
        }), new Song({
            name: 'Si Pudiera',
            artists: artists[47]._id,
            file: ''
        }), new Song({
            name: 'Lo Peor de Mí',
            artists: artists[47]._id,
            file: ''
        }), new Song({
            name: 'Reconozco',
            artists: artists[47]._id,
            file: ''
        }), new Song({
            name: 'Mi Código',
            artists: artists[48]._id,
            file: ''
        }), new Song({
            name: 'Me Dice Que No',
            artists: artists[48]._id,
            file: ''
        }), new Song({
            name: 'Vatos',
            artists: artists[48]._id,
            file: ''
        }), new Song({
            name: 'Soy un Niño',
            artists: artists[48]._id,
            file: ''
        }), new Song({
            name: 'Gettin\' Ready',
            artists: artists[48]._id,
            file: ''
        }), new Song({
            name: 'Volverte a Ver (Good Version)',
            artists: artists[48]._id,
            file: ''
        }), new Song({
            name: 'Cadenas de Oro',
            artists: artists[48]._id,
            file: ''
        }), new Song({
            name: 'Two Gunshots',
            artists: artists[48]._id,
            file: ''
        }), new Song({
            name: 'Hierba Verde',
            artists: artists[48]._id,
            file: ''
        }), new Song({
            name: 'Kambelleh',
            artists: artists[48]._id,
            file: ''
        }), new Song({
            name: 'Gal Regular',
            artists: artists[48]._id,
            file: ''
        }), new Song({
            name: 'Me Toman por el Enemigo',
            artists: artists[48]._id,
            file: ''
        }), new Song({
            name: 'Revolution',
            artists: artists[49]._id,
            file: ''
        }), new Song({
            name: 'Jah Will Be There',
            artists: artists[49]._id,
            file: ''
        }), new Song({
            name: 'Rock It Ina Dance',
            artists: artists[49]._id,
            file: ''
        }), new Song({
            name: 'Skin Teeth',
            artists: artists[49]._id,
            file: ''
        }), new Song({
            name: 'Heathen Wage',
            artists: artists[49]._id,
            file: ''
        }), new Song({
            name: 'Fight for Your Rights',
            artists: artists[49]._id,
            file: ''
        }), new Song({
            name: 'No Peace',
            artists: artists[49]._id,
            file: ''
        }), new Song({
            name: 'We All',
            artists: artists[49]._id,
            file: ''
        }), new Song({
            name: 'Twisted Sheets',
            artists: artists[49]._id,
            file: ''
        }), new Song({
            name: 'Natty Dread',
            artists: artists[49]._id,
            file: ''
        }), new Song({
            name: 'Boom (Wah da da Deng)',
            artists: artists[49]._id,
            file: ''
        }), new Song({
            name: 'Black Skin King',
            artists: artists[49]._id,
            file: ''
        }), new Song({
            name: 'Made I Whole',
            artists: artists[49]._id,
            file: ''
        }), new Song({
            name: 'A Jah Jah',
            artists: artists[50]._id,
            file: ''
        }), new Song({
            name: 'That\'s The Way',
            artists: artists[50]._id,
            file: ''
        }), new Song({
            name: 'Who Feels It Knowns It',
            artists: artists[50]._id,
            file: ''
        }), new Song({
            name: 'One Draw',
            artists: artists[50]._id,
            file: ''
        }), new Song({
            name: 'Thank You Jah',
            artists: artists[50]._id,
            file: ''
        }), new Song({
            name: 'Good Morning Jah',
            artists: artists[50]._id,
            file: ''
        }), new Song({
            name: 'I\'m Still Waiting',
            artists: artists[50]._id,
            file: ''
        }), new Song({
            name: 'Play Play',
            artists: artists[50]._id,
            file: ''
        }), new Song({
            name: 'Jah Jah Don\'t Want',
            artists: artists[50]._id,
            file: ''
        }), new Song({
            name: 'Easy Sailing',
            artists: artists[50]._id,
            file: ''
        }), new Song({
            name: 'Billy Jack',
            artists: artists[51]._id,
            file: ''
        }), new Song({
            name: 'When Seasons Change',
            artists: artists[51]._id,
            file: ''
        }), new Song({
            name: 'So In Love',
            artists: artists[51]._id,
            file: ''
        }), new Song({
            name: 'Jesus',
            artists: artists[51]._id,
            file: ''
        }), new Song({
            name: 'Blue Monday People',
            artists: artists[51]._id,
            file: ''
        }), new Song({
            name: 'Hard Times',
            artists: artists[51]._id,
            file: ''
        }), new Song({
            name: 'Love To The People',
            artists: artists[51]._id,
            file: ''
        }), new Song({
            name: '(Sittin\'On) the Dock of the Bay',
            artists: artists[52]._id,
            file: ''
        }), new Song({
            name: 'Think About It',
            artists: artists[52]._id,
            file: ''
        }), new Song({
            name: 'Hard to Handle',
            artists: artists[52]._id,
            file: ''
        }), new Song({
            name: 'The Happy Song (Dum-Dum)',
            artists: artists[52]._id,
            file: ''
        }), new Song({
            name: 'Love Man',
            artists: artists[52]._id,
            file: ''
        }), new Song({
            name: 'Direct Me',
            artists: artists[52]._id,
            file: ''
        }), new Song({
            name: 'I\'ve Got Dreams to Remember',
            artists: artists[52]._id,
            file: ''
        }), new Song({
            name: 'Champagne and Wine',
            artists: artists[52]._id,
            file: ''
        }), new Song({
            name: 'Pounds And Hundreds (LBS + 100s)',
            artists: artists[52]._id,
            file: ''
        }), new Song({
            name: 'I\'m a Changed Man',
            artists: artists[52]._id,
            file: ''
        }), new Song({
            name: 'Gone Again',
            artists: artists[52]._id,
            file: ''
        }), new Song({
            name: 'Amen',
            artists: artists[52]._id,
            file: ''
        }), new Song({
            name: 'Where Did Our Love Go',
            artists: artists[53]._id,
            file: ''
        }), new Song({
            name: 'Run, Run, Run',
            artists: artists[53]._id,
            file: ''
        }), new Song({
            name: 'Baby Love',
            artists: artists[53]._id,
            file: ''
        }), new Song({
            name: 'When the Lovelight Starts Shining Through His Eyes',
            artists: artists[53]._id,
            file: ''
        }), new Song({
            name: 'Come See About Me',
            artists: artists[53]._id,
            file: ''
        }), new Song({
            name: 'Long Gone Lover',
            artists: artists[53]._id,
            file: ''
        }), new Song({
            name: 'I\'m Giving You Your Freedom',
            artists: artists[53]._id,
            file: ''
        }), new Song({
            name: 'A Breath Taking Guy',
            artists: artists[53]._id,
            file: ''
        }), new Song({
            name: 'He Means the World to Me',
            artists: artists[53]._id,
            file: ''
        }), new Song({
            name: 'Standing at the Crossroads of Love',
            artists: artists[53]._id,
            file: ''
        }), new Song({
            name: 'Your Kiss of Fire',
            artists: artists[53]._id,
            file: ''
        }), new Song({
            name: 'Ask Any Girl',
            artists: artists[53]._id,
            file: ''
        }), new Song({
            name: 'Eye To Eye',
            artists: artists[54]._id,
            file: ''
        }), new Song({
            name: 'May',
            artists: artists[54]._id,
            file: ''
        }), new Song({
            name: 'Sorceress',
            artists: artists[54]._id,
            file: ''
        }), new Song({
            name: 'Nerve',
            artists: artists[54]._id,
            file: ''
        }), new Song({
            name: 'Goodbyes',
            artists: artists[54]._id,
            file: ''
        }), new Song({
            name: 'Clues Blues',
            artists: artists[54]._id,
            file: ''
        }), new Song({
            name: 'Chemical Coincidence',
            artists: artists[54]._id,
            file: ''
        }), new Song({
            name: 'Carnation',
            artists: artists[54]._id,
            file: ''
        }), new Song({
            name: 'Lucid',
            artists: artists[54]._id,
            file: ''
        }), new Song({
            name: 'Hiding Place',
            artists: artists[54]._id,
            file: ''
        }), new Song({
            name: 'Wallflower',
            artists: artists[54]._id,
            file: ''
        }), new Song({
            name: 'Lost City',
            artists: artists[55]._id,
            file: ''
        }), new Song({
            name: 'Roots in the Air',
            artists: artists[55]._id,
            file: ''
        }), new Song({
            name: 'My Microphone',
            artists: artists[55]._id,
            file: ''
        }), new Song({
            name: 'Flower of the Desert',
            artists: artists[55]._id,
            file: ''
        }), new Song({
            name: 'Digital Shoots',
            artists: artists[55]._id,
            file: ''
        }), new Song({
            name: 'No Pain',
            artists: artists[55]._id,
            file: ''
        }), new Song({
            name: 'Vampire',
            artists: artists[55]._id,
            file: ''
        }), new Song({
            name: 'The River',
            artists: artists[55]._id,
            file: ''
        }), new Song({
            name: 'Come Back Around',
            artists: artists[56]._id,
            file: ''
        }), new Song({
            name: 'High Grade',
            artists: artists[56]._id,
            file: ''
        }), new Song({
            name: 'Take Control (feat. Ice Prince)',
            artists: artists[56]._id,
            file: ''
        }), new Song({
            name: 'Excita',
            artists: artists[56]._id,
            file: ''
        }), new Song({
            name: 'No Behavior',
            artists: artists[56]._id,
            file: ''
        }), new Song({
            name: 'Swing Low',
            artists: artists[56]._id,
            file: ''
        }), new Song({
            name: 'Best Friend (feat. Tanya Stephens)',
            artists: artists[56]._id,
            file: ''
        }), new Song({
            name: 'Be My Princess',
            artists: artists[57]._id,
            file: ''
        }), new Song({
            name: 'Jah Fire Will Be Burning',
            artists: artists[57]._id,
            file: ''
        }), new Song({
            name: 'Walk With Jah',
            artists: artists[57]._id,
            file: ''
        }), new Song({
            name: 'King Of Israel',
            artists: artists[57]._id,
            file: ''
        }), new Song({
            name: 'Milion Miles',
            artists: artists[57]._id,
            file: ''
        }), new Song({
            name: 'My Woman Can',
            artists: artists[57]._id,
            file: ''
        }), new Song({
            name: 'You Over There',
            artists: artists[57]._id,
            file: ''
        }), new Song({
            name: 'Black Sheep',
            artists: artists[57]._id,
            file: ''
        }), new Song({
            name: 'YimMasGan',
            artists: artists[58]._id,
            file: ''
        }), new Song({
            name: 'Third World Keeps Turning',
            artists: artists[58]._id,
            file: ''
        }), new Song({
            name: 'Loving You Is Easy',
            artists: artists[58]._id,
            file: ''
        }), new Song({
            name: 'People of a Different Color - Pressure Busspipe',
            artists: artists[58]._id,
            file: ''
        }), new Song({
            name: 'Na Na Na - Chronixx',
            artists: artists[58]._id,
            file: ''
        }), new Song({
            name: 'Feel Good - Busy Signal',
            artists: artists[58]._id,
            file: ''
        }), new Song({
            name: 'Island Dreams - Tessanne Chin, Tarrus Riley',
            artists: artists[58]._id,
            file: ''
        }), new Song({
            name: 'Sheep in Meadows',
            artists: artists[58]._id,
            file: ''
        }), new Song({
            name: 'You\'re Not the Only One - Daminan Marley',
            artists: artists[58]._id,
            file: ''
        }), new Song({
            name: 'More Work to Be Done',
            artists: artists[58]._id,
            file: ''
        }), new Song({
            name: 'Hear Us Out',
            artists: artists[58]._id,
            file: ''
        }), new Song({
            name: '24K Magic',
            artists: artists[59]._id,
            file: ''
        }), new Song({
            name: 'Chunky',
            artists: artists[59]._id,
            file: ''
        }), new Song({
            name: 'Perm',
            artists: artists[59]._id,
            file: ''
        }), new Song({
            name: 'That\'s What I Like',
            artists: artists[59]._id,
            file: ''
        }), new Song({
            name: 'Versace on the Floor',
            artists: artists[59]._id,
            file: ''
        }), new Song({
            name: 'Straight Up & Down',
            artists: artists[59]._id,
            file: ''
        }), new Song({
            name: 'Calling All My Lovelies',
            artists: artists[59]._id,
            file: ''
        }), new Song({
            name: 'Finesse',
            artists: artists[59]._id,
            file: ''
        }), new Song({
            name: 'Too Godd to Say Goodbye',
            artists: artists[59]._id,
            file: ''
        }), new Song({
            name: 'Eraser',
            artists: artists[60]._id,
            file: ''
        }), new Song({
            name: 'Castle on the Hill',
            artists: artists[60]._id,
            file: ''
        }), new Song({
            name: 'Dive',
            artists: artists[60]._id,
            file: ''
        }), new Song({
            name: 'Shape of You',
            artists: artists[60]._id,
            file: ''
        }), new Song({
            name: 'Perfect',
            artists: artists[60]._id,
            file: ''
        }), new Song({
            name: 'Galway Girl',
            artists: artists[60]._id,
            file: ''
        }), new Song({
            name: 'Happier',
            artists: artists[60]._id,
            file: ''
        }), new Song({
            name: 'New Man',
            artists: artists[60]._id,
            file: ''
        }), new Song({
            name: 'Hearts Don\'t Break Around Here',
            artists: artists[60]._id,
            file: ''
        }), new Song({
            name: 'What Do I Know?',
            artists: artists[60]._id,
            file: ''
        }), new Song({
            name: 'How Would You Feel (Paean)',
            artists: artists[60]._id,
            file: ''
        }), new Song({
            name: 'Supermarket Flowers',
            artists: artists[60]._id,
            file: ''
        }), new Song({
            name: 'Barcelona',
            artists: artists[60]._id,
            file: ''
        }), new Song({
            name: 'Bibia Be Ye Ye',
            artists: artists[60]._id,
            file: ''
        }), new Song({
            name: 'Nancy Mulligan',
            artists: artists[60]._id,
            file: ''
        }), new Song({
            name: 'Save Myself',
            artists: artists[60]._id,
            file: ''
        }), new Song({
            name: 'Hello',
            artists: artists[61]._id,
            file: ''
        }), new Song({
            name: 'Roll With It',
            artists: artists[61]._id,
            file: ''
        }), new Song({
            name: 'Wonderwall',
            artists: artists[61]._id,
            file: ''
        }), new Song({
            name: 'Don\'t Look Back in Anger',
            artists: artists[61]._id,
            file: ''
        }), new Song({
            name: 'Hey Now!',
            artists: artists[61]._id,
            file: ''
        }), new Song({
            name: 'Bonhead\'s Bank Holiday',
            artists: artists[61]._id,
            file: ''
        }), new Song({
            name: 'Some Might Say',
            artists: artists[61]._id,
            file: ''
        }), new Song({
            name: 'Cast No Shadow',
            artists: artists[61]._id,
            file: ''
        }), new Song({
            name: 'She\'s Electric',
            artists: artists[61]._id,
            file: ''
        }), new Song({
            name: 'Morning Glory',
            artists: artists[61]._id,
            file: ''
        }), new Song({
            name: 'Champagne Supernova',
            artists: artists[61]._id,
            file: ''
        }), new Song({
            name: 'Gloria',
            artists: artists[62]._id,
            file: ''
        }), new Song({
            name: 'Redondo Beach',
            artists: artists[62]._id,
            file: ''
        }), new Song({
            name: 'Birdland',
            artists: artists[62]._id,
            file: ''
        }), new Song({
            name: 'Free Money',
            artists: artists[62]._id,
            file: ''
        }), new Song({
            name: 'Kimberly',
            artists: artists[62]._id,
            file: ''
        }), new Song({
            name: 'Break It Up',
            artists: artists[62]._id,
            file: ''
        }), new Song({
            name: 'Land: Horses/Land of a Thousand Dances/La Mer (De)',
            artists: artists[62]._id,
            file: ''
        }), new Song({
            name: 'Elegie',
            artists: artists[62]._id,
            file: ''
        }), new Song({
            name: 'Amarillo',
            artists: artists[63]._id,
            file: ''
        }), new Song({
            name: 'Azul',
            artists: artists[63]._id,
            file: ''
        }), new Song({
            name: 'Rojo',
            artists: artists[63]._id,
            file: ''
        }), new Song({
            name: 'Rosa',
            artists: artists[63]._id,
            file: ''
        }), new Song({
            name: 'Morado',
            artists: artists[63]._id,
            file: ''
        }), new Song({
            name: 'Verde',
            artists: artists[63]._id,
            file: ''
        }), new Song({
            name: 'Negro',
            artists: artists[63]._id,
            file: ''
        }), new Song({
            name: 'Gris',
            artists: artists[63]._id,
            file: ''
        }), new Song({
            name: 'Arcoíris',
            artists: artists[63]._id,
            file: ''
        }), new Song({
            name: 'Blanco',
            artists: artists[63]._id,
            file: ''
        }), new Song({
            name: 'Cuando nadie me ve',
            artists: artists[64]._id,
            file: ''
        }), new Song({
            name: 'Hay un universo de pequeñas cosas',
            artists: artists[64]._id,
            file: ''
        }), new Song({
            name: 'Quisiera ser',
            artists: artists[64]._id,
            file: ''
        }), new Song({
            name: 'Para que me quieras',
            artists: artists[64]._id,
            file: ''
        }), new Song({
            name: 'Llega, llego soledad',
            artists: artists[64]._id,
            file: ''
        }), new Song({
            name: 'El alma al aire',
            artists: artists[64]._id,
            file: ''
        }), new Song({
            name: 'Me iré',
            artists: artists[64]._id,
            file: ''
        }), new Song({
            name: 'Hicimos un trato',
            artists: artists[64]._id,
            file: ''
        }), new Song({
            name: 'Tiene que ser pecado',
            artists: artists[64]._id,
            file: ''
        }), new Song({
            name: 'Silencio',
            artists: artists[64]._id,
            file: ''
        }), new Song({
            name: 'Intro',
            artists: artists[65]._id,
            file: ''
        }), new Song({
            name: 'Por la calle abajo',
            artists: artists[65]._id,
            file: ''
        }), new Song({
            name: 'Danger',
            artists: artists[65]._id,
            file: ''
        }), new Song({
            name: 'Cowboys',
            artists: artists[65]._id,
            file: ''
        }), new Song({
            name: 'Gusanos de seda',
            artists: artists[65]._id,
            file: ''
        }), new Song({
            name: 'Monfrero',
            artists: artists[65]._id,
            file: ''
        }), new Song({
            name: 'Interludio',
            artists: artists[65]._id,
            file: ''
        }), new Song({
            name: 'Narcolepsia',
            artists: artists[65]._id,
            file: ''
        }), new Song({
            name: 'Dinamo',
            artists: artists[65]._id,
            file: ''
        }), new Song({
            name: 'Pa que lo gocen',
            artists: artists[65]._id,
            file: ''
        }), new Song({
            name: 'Avisos parentales',
            artists: artists[65]._id,
            file: ''
        }), new Song({
            name: 'Reina',
            artists: artists[65]._id,
            file: ''
        }), new Song({
            name: 'Qué más da',
            artists: artists[65]._id,
            file: ''
        }), new Song({
            name: 'Dale',
            artists: artists[65]._id,
            file: ''
        }), new Song({
            name: 'Báilame la mirada',
            artists: artists[65]._id,
            file: ''
        }), new Song({
            name: 'Highest in the Room (Remix)',
            artists: artists[66]._id,
            file: ''
        }), new Song({
            name: 'Jackboys',
            artists: artists[66]._id,
            file: ''
        }), new Song({
            name: 'Gang Gang',
            artists: artists[66]._id,
            file: ''
        }), new Song({
            name: 'Had Enough',
            artists: artists[66]._id,
            file: ''
        }), new Song({
            name: 'Out West',
            artists: artists[66]._id,
            file: ''
        }), new Song({
            name: 'What to Do?',
            artists: artists[66]._id,
            file: ''
        }), new Song({
            name: 'Gatti',
            artists: artists[66]._id,
            file: ''
        }), new Song({
            name: 'Smash Lies',
            artists: artists[67]._id,
            file: ''
        }), new Song({
            name: 'We Will Walk',
            artists: artists[67]._id,
            file: ''
        }), new Song({
            name: 'One Day',
            artists: artists[67]._id,
            file: ''
        }), new Song({
            name: 'Escape',
            artists: artists[67]._id,
            file: ''
        }), new Song({
            name: 'So Hi So Lo',
            artists: artists[67]._id,
            file: ''
        }), new Song({
            name: 'I will Be Light',
            artists: artists[67]._id,
            file: ''
        }), new Song({
            name: 'For You',
            artists: artists[67]._id,
            file: ''
        }), new Song({
            name: 'On Nature',
            artists: artists[67]._id,
            file: ''
        }), new Song({
            name: 'Motivate',
            artists: artists[67]._id,
            file: ''
        }), new Song({
            name: 'Struggla',
            artists: artists[67]._id,
            file: ''
        }), new Song({
            name: 'Give Rasta Praise',
            artists: artists[68]._id,
            file: ''
        }), new Song({
            name: 'Natty Dread Up Town',
            artists: artists[68]._id,
            file: ''
        }), new Song({
            name: 'Jah-Jah Gonna Get You',
            artists: artists[68]._id,
            file: ''
        }), new Song({
            name: 'Barabas',
            artists: artists[68]._id,
            file: ''
        }), new Song({
            name: 'Rasta Pon Top',
            artists: artists[68]._id,
            file: ''
        }), new Song({
            name: 'Beat Them Jah-Jah',
            artists: artists[68]._id,
            file: ''
        }), new Song({
            name: 'African Liberation',
            artists: artists[68]._id,
            file: ''
        }), new Song({
            name: 'Different Kind a World',
            artists: artists[68]._id,
            file: ''
        }), new Song({
            name: 'Big Bam Bam',
            artists: artists[68]._id,
            file: ''
        }), new Song({
            name: 'It Gwine Dreada (Prophecy',
            artists: artists[68]._id,
            file: ''
        }), new Song({
            name: 'Part Time Lover',
            artists: artists[69]._id,
            file: ''
        }), new Song({
            name: 'I Love You Too Much',
            artists: artists[69]._id,
            file: ''
        }), new Song({
            name: 'Whereabouts',
            artists: artists[69]._id,
            file: ''
        }), new Song({
            name: 'Stranger on the Shore of Love',
            artists: artists[69]._id,
            file: ''
        }), new Song({
            name: 'Never in Your Sun',
            artists: artists[69]._id,
            file: ''
        }), new Song({
            name: 'Spiritual Walkers',
            artists: artists[69]._id,
            file: ''
        }), new Song({
            name: 'Land of La La',
            artists: artists[69]._id,
            file: ''
        }), new Song({
            name: 'Go Home',
            artists: artists[69]._id,
            file: ''
        }), new Song({
            name: 'Overjoyed',
            artists: artists[69]._id,
            file: ''
        }), new Song({
            name: 'It\'s Wrong (Apartheid)',
            artists: artists[69]._id,
            file: ''
        }), new Song({
            name: 'Our Day Will Come',
            artists: artists[70]._id,
            file: ''
        }), new Song({
            name: 'How Glad I Am',
            artists: artists[70]._id,
            file: ''
        }), new Song({
            name: 'Oh No, Not My Baby',
            artists: artists[70]._id,
            file: ''
        }), new Song({
            name: 'Rescue Me',
            artists: artists[70]._id,
            file: ''
        }), new Song({
            name: 'Gee Whiz',
            artists: artists[70]._id,
            file: ''
        }), new Song({
            name: 'I\'m a Woman',
            artists: artists[70]._id,
            file: ''
        }), new Song({
            name: 'Since I Fell for You',
            artists: artists[70]._id,
            file: ''
        }), new Song({
            name: 'Impossible',
            artists: artists[70]._id,
            file: ''
        }), new Song({
            name: 'You\'ve Lost That Lovin\' Feelin\'',
            artists: artists[70]._id,
            file: ''
        }), new Song({
            name: 'Soul of the Man',
            artists: artists[70]._id,
            file: ''
        }), new Song({
            name: 'Come and Get These Memories',
            artists: artists[70]._id,
            file: ''
        }), new Song({
            name: 'I Know',
            artists: artists[70]._id,
            file: ''
        }))

        albums.push(new Album({
            name: 'Legend',
            artists: [artists[0]._id],
            songs: [songs[0]._id, songs[1]._id, songs[2]._id, songs[3]._id, songs[4]._id, songs[5]._id, songs[6]._id, songs[7]._id, songs[8]._id, songs[9]._id, songs[10]._id, songs[11]._id, songs[12]._id, songs[13]._id,],
            genre: 'Reggae',
            year: '1984',
            priceVinyl: '10',
            priceDigital: '6',
            portrait: 'bob.jpeg'
        }), new Album({
            name: 'What\'s Going On',
            artists: [artists[1]._id],
            songs: [songs[14]._id, songs[15]._id, songs[16]._id, songs[17]._id, songs[18]._id, songs[19]._id, songs[20]._id, songs[21]._id, songs[22]._id],
            genre: 'Soul',
            year: '1971',
            priceVinyl: '10',
            priceDigital: '6',
            portrait: 'Marvin Gaye - What\'s Going On - Tapa.jpg'
        }), new Album({
            name: 'I Never Loved A Man The Way I Loved You',
            artists: [artists[2]._id],
            songs: [songs[23]._id, songs[24]._id, songs[25]._id, songs[26]._id, songs[27]._id, songs[28]._id, songs[29]._id, songs[30]._id, songs[31]._id, songs[32]._id, songs[33]._id],
            genre: 'Soul',
            year: '1967',
            priceVinyl: '10',
            priceDigital: '6',
            portrait: 'Aretha_Franklin-I_Never_Loved_A_Man_The_Way_I_Love_You-Frontal.jpg'
        }), new Album({
            name: 'American Idiot',
            artists: [artists[3]._id],
            songs: [songs[34]._id, songs[35]._id, songs[36]._id, songs[37]._id, songs[38]._id, songs[39]._id, songs[40]._id, songs[41]._id, songs[42]._id, songs[43]._id, songs[44]._id, songs[45]._id, songs[46]._id],
            genre: 'Rock',
            year: '2004',
            priceVinyl: '10',
            priceDigital: '6',
            portrait: '81xQyMV89lL._SL1200_.jpg'
        }), new Album({
            name: 'Appetite For Destruction',
            artists: [artists[4]._id],
            songs: [songs[47]._id, songs[48]._id, songs[49]._id, songs[50]._id, songs[51]._id, songs[52]._id, songs[53]._id, songs[54]._id, songs[55]._id, songs[56]._id, songs[57]._id, songs[58]._id],
            genre: 'Rock',
            year: '1987',
            priceVinyl: '10',
            priceDigital: '6',
            portrait: '715+oHIdRTL._SL1296_.jpg'
        }), new Album({
            name: 'Overexposed',
            artists: [artists[5]._id],
            songs: [songs[59]._id, songs[60]._id, songs[61]._id, songs[62]._id, songs[63]._id, songs[64]._id, songs[65]._id, songs[66]._id, songs[67]._id, songs[68]._id, songs[69]._id, songs[70]._id],
            genre: 'Pop',
            year: '2012',
            priceVinyl: '10',
            priceDigital: '6',
            portrait: '91+AN0UYE3L._SL1500_.jpg'
        }), new Album({
            name: 'London Calling',
            artists: [artists[6]._id],
            songs: [songs[71]._id, songs[72]._id, songs[73]._id, songs[74]._id, songs[75]._id, songs[76]._id, songs[77]._id, songs[78]._id, songs[79]._id, songs[80]._id, songs[81]._id, songs[82]._id, songs[83]._id, songs[84]._id, songs[85]._id, songs[86]._id, songs[87]._id, songs[88]._id, songs[89]._id],
            genre: 'Rock',
            year: '1979',
            priceVinyl: '10',
            priceDigital: '6',
            portrait: 'the-clash-london-calling-696x692.jpg'
        }), new Album({
            name: 'Their Greatest Hits',
            artists: [artists[7]._id],
            songs: [songs[90]._id, songs[91]._id, songs[92]._id, songs[93]._id, songs[94]._id, songs[95]._id, songs[96]._id, songs[97]._id, songs[98]._id, songs[99]._id, songs[100]._id, songs[101]._id, songs[102]._id],
            genre: 'Rock',
            year: '1990',
            priceVinyl: '10',
            priceDigital: '6',
            portrait: 'The_Police-Their_Greatest_Hits-Frontal.jpg'
        }), new Album({
            name: 'La Ley Innata',
            artists: [artists[8]._id],
            songs: [songs[103]._id, songs[104]._id, songs[105]._id, songs[106]._id, songs[107]._id, songs[108]._id],
            genre: 'Rock',
            year: '2008',
            priceVinyl: '10',
            priceDigital: '6',
            portrait: '00105110274973____1__1200x1200.jpg'
        }), new Album({
            name: 'El Mal Querer',
            artists: [artists[9]._id],
            songs: [songs[109]._id, songs[110]._id, songs[111]._id, songs[112]._id, songs[113]._id, songs[114]._id, songs[115]._id, songs[116]._id, songs[117]._id, songs[118]._id, songs[119]._id],
            genre: 'Latin',
            year: '2018',
            priceVinyl: '10',
            priceDigital: '6',
            portrait: '61Q2xBd9xjL._SL1205_.jpg'
        }), new Album({
            name: 'Mi Sangre',
            artists: [artists[10]._id],
            songs: [songs[120]._id, songs[121]._id, songs[122]._id, songs[123]._id, songs[124]._id, songs[125]._id, songs[126]._id, songs[127]._id, songs[128]._id, songs[129]._id, songs[130]._id, songs[131]._id],
            genre: 'Latin',
            year: '2004',
            priceVinyl: '10',
            priceDigital: '6',
            portrait: '51tITwjtJOL.jpg'
        }), new Album({
            name: 'Thriller',
            artists: [artists[11]._id],
            songs: [songs[132]._id, songs[133]._id, songs[134]._id, songs[135]._id, songs[136]._id, songs[137]._id, songs[138]._id, songs[139]._id, songs[140]._id,],
            genre: 'Pop',
            year: '1982',
            priceVinyl: '10',
            priceDigital: '6',
            portrait: '81wfye0hsDL._SL1500_.jpg'
        }), new Album({
            name: 'Vivir para contarlo',
            artists: [artists[12]._id],
            songs: [songs[141]._id, songs[142]._id, songs[143]._id, songs[144]._id, songs[145]._id, songs[146]._id, songs[147]._id, songs[148]._id, songs[149]._id, songs[150]._id, songs[151]._id, songs[152]._id, songs[153]._id, songs[154]._id],
            genre: 'Hip-hop',
            year: '2006',
            priceVinyl: '10',
            priceDigital: '6',
            portrait: '51wH-QpPdcL.jpg'
        }), new Album({
            name: 'Kamikaze',
            artists: [artists[13]._id],
            songs: [songs[155]._id, songs[156]._id, songs[157]._id, songs[158]._id, songs[159]._id, songs[160]._id, songs[161]._id, songs[162]._id, songs[163]._id, songs[164]._id, songs[165]._id, songs[166]._id, songs[167]._id],
            genre: 'Hip-hop',
            year: '2018',
            priceVinyl: '10',
            priceDigital: '6',
            portrait: '71wrmbD+kiL._SL1200_.jpg'
        }), new Album({
            name: 'A Través De Mí',
            artists: [artists[14]._id],
            songs: [songs[168]._id, songs[169]._id, songs[170]._id, songs[171]._id, songs[172]._id, songs[173]._id, songs[174]._id, songs[175]._id, songs[176]._id, songs[177]._id, songs[178]._id, songs[179]._id, songs[180]._id, songs[181]._id, songs[182]._id],
            genre: 'Hip-hop',
            year: '2015',
            priceVinyl: '10',
            priceDigital: '6',
            portrait: '615mMZHJLgL.jpg'
        }), new Album({
            name: '7 Days A Week',
            artists: [artists[15]._id],
            songs: [songs[183]._id, songs[184]._id, songs[185]._id, songs[186]._id, songs[187]._id, songs[188]._id, songs[189]._id, songs[190]._id, songs[191]._id, songs[192]._id, songs[193]._id, songs[194]._id, songs[195]._id],
            genre: 'Reggae',
            year: '1998',
            priceVinyl: '10',
            priceDigital: '6',
            portrait: '51MtntXviRL.jpg'
        }), new Album({
            name: 'El viaje de Copperpot',
            artists: [artists[16]._id],
            songs: [songs[196]._id, songs[197]._id, songs[198]._id, songs[199]._id, songs[200]._id, songs[201]._id, songs[202]._id, songs[203]._id, songs[204]._id, songs[205]._id, songs[206]._id, songs[207]._id, songs[208]._id],
            genre: 'Pop',
            year: '2000',
            priceVinyl: '10',
            priceDigital: '6',
            portrait: '81okQwFgL9L._SL1500_.jpg'
        }), new Album({
            name: 'Like A Prayer',
            artists: [artists[17]._id],
            songs: [songs[209]._id, songs[210]._id, songs[211]._id, songs[212]._id, songs[213]._id, songs[214]._id, songs[215]._id, songs[216]._id, songs[217]._id, songs[218]._id, songs[219]._id],
            genre: 'Pop',
            year: '1989',
            priceVinyl: '10',
            priceDigital: '6',
            portrait: '51w-HElZCuL.jpg'
        }), new Album({
            name: 'Yo! Bum Rush the Show',
            artists: [artists[18]._id],
            songs: [songs[220]._id, songs[221]._id, songs[222]._id, songs[223]._id, songs[224]._id, songs[225]._id, songs[226]._id, songs[227]._id, songs[228]._id, songs[229]._id, songs[230]._id, songs[231]._id],
            genre: 'Hip-hop',
            year: '1987',
            priceVinyl: '10',
            priceDigital: '6',
            portrait: '81FI1yRimjL._SS500_.jpg'
        }), new Album({
            name: 'Entren los que quieran',
            artists: [artists[19]._id],
            songs: [songs[232]._id, songs[233]._id, songs[234]._id, songs[235]._id, songs[236]._id, songs[237]._id, songs[238]._id, songs[239]._id, songs[240]._id, songs[241]._id, songs[242]._id, songs[243]._id, songs[244]._id, songs[245]._id],
            genre: 'Latin',
            year: '2010',
            priceVinyl: '10',
            priceDigital: '6',
            portrait: '91Trpi6frCL._SL1500_.jpg'
        }), new Album({
            name: 'Space Oddity',
            artists: [artists[20]._id],
            songs: [songs[246]._id, songs[247]._id, songs[248]._id, songs[249]._id, songs[250]._id, songs[251]._id, songs[252]._id, songs[253]._id, songs[254]._id],
            genre: 'Rock',
            year: '1969',
            priceVinyl: '10',
            priceDigital: '6',
            portrait: 'bowo.jpg'
        }), new Album({
            name: 'Funky Kingston',
            artists: [artists[21]._id],
            songs: [songs[255]._id, songs[256]._id, songs[257]._id, songs[258]._id, songs[259]._id, songs[260]._id, songs[261]._id, songs[262]._id],
            genre: 'Reggae',
            year: '1972',
            priceVinyl: '10',
            priceDigital: '6',
            portrait: 'c748a2e739c4cf8a592d970a86c7eb72.jpg'
        }), new Album({
            name: 'Future Nostalgia',
            artists: [artists[22]._id],
            songs: [songs[263]._id, songs[264]._id, songs[265]._id, songs[266]._id, songs[267]._id, songs[268]._id, songs[269]._id, songs[270]._id, songs[271]._id, songs[272]._id, songs[273]._id],
            genre: 'Pop',
            year: '2020',
            priceVinyl: '10',
            priceDigital: '6',
            portrait: '91emleWHY1L.jpg'
        }), new Album({
            name: 'Music to Be Murdered By',
            artists: [artists[13]._id],
            songs: [songs[274]._id, songs[275]._id, songs[276]._id, songs[277]._id, songs[278]._id, songs[279]._id, songs[280]._id, songs[281]._id, songs[282]._id, songs[283]._id, songs[284]._id, songs[285]._id, songs[286]._id, songs[287]._id, songs[288]._id, songs[289]._id, songs[290]._id, songs[291]._id, songs[292]._id, songs[293]._id],
            genre: 'Hip-hop',
            year: '2020',
            priceVinyl: '10',
            priceDigital: '6',
            portrait: 'A1VgJbgT8CL._SL1500_.jpg'
        }), new Album({
            name: 'Lost & Found',
            artists: [artists[23]._id],
            songs: [songs[294]._id, songs[295]._id, songs[296]._id, songs[297]._id, songs[298]._id, songs[299]._id, songs[300]._id, songs[301]._id, songs[302]._id, songs[303]._id, songs[304]._id, songs[305]._id],
            genre: 'Soul',
            year: '2018',
            priceVinyl: '10',
            priceDigital: '6',
            portrait: '71vKKrtUh8L._AC_SL1204_.jpg'
        }), new Album({
            name: 'El último clásico',
            artists: [artists[24]._id],
            songs: [songs[306]._id, songs[307]._id, songs[308]._id, songs[309]._id, songs[310]._id, songs[311]._id, songs[312]._id, songs[313]._id, songs[314]._id, songs[315]._id],
            genre: 'Rock',
            year: '2019',
            priceVinyl: '10',
            priceDigital: '6',
            portrait: '916i3DeMTVL._SL1500_.jpg'
        }), new Album({
            name: 'Romance',
            artists: [artists[25]._id],
            songs: [songs[316]._id, songs[317]._id, songs[318]._id, songs[319]._id, songs[320]._id, songs[321]._id, songs[322]._id, songs[323]._id, songs[324]._id, songs[325]._id, songs[326]._id, songs[327]._id, songs[328]._id, songs[329]._id],
            genre: 'Pop',
            year: '2019',
            priceVinyl: '10',
            priceDigital: '6',
            portrait: '61sAIvAZZmL._SL1200_.jpg'
        }), new Album({
            name: 'Jesus Is King',
            artists: [artists[26]._id],
            songs: [songs[330]._id, songs[331]._id, songs[332]._id, songs[333]._id, songs[334]._id, songs[335]._id, songs[336]._id, songs[337]._id, songs[338]._id, songs[339]._id, songs[340]._id],
            genre: 'Hip-hop',
            year: '2019',
            priceVinyl: '10',
            priceDigital: '6',
            portrait: 'kanye-jesus.jpg'
        }), new Album({
            name: 'El Dorado',
            artists: [artists[27]._id],
            songs: [songs[341]._id, songs[342]._id, songs[343]._id, songs[344]._id, songs[345]._id, songs[346]._id, songs[347]._id, songs[348]._id, songs[349]._id, songs[350]._id, songs[351]._id, songs[352]._id, songs[353]._id],
            genre: 'Latin',
            year: '2017',
            priceVinyl: '10',
            priceDigital: '6',
            portrait: '61ESnYnpc3L._SL1417_.jpg'
        }), new Album({
            name: 'Camino, Fuego Y Libertad',
            artists: [artists[28]._id],
            songs: [songs[354]._id, songs[355]._id, songs[356]._id, songs[357]._id, songs[358]._id, songs[359]._id, songs[360]._id, songs[361]._id, songs[362]._id, songs[363]._id, songs[364]._id],
            genre: 'Latin',
            year: '2017',
            priceVinyl: '10',
            priceDigital: '6',
            portrait: '812WWdV4+9L._SL1500_.jpg'
        }), new Album({
            name: 'Vida',
            artists: [artists[29]._id],
            songs: [songs[365]._id, songs[366]._id, songs[367]._id, songs[368]._id, songs[369]._id, songs[370]._id, songs[371]._id, songs[372]._id, songs[373]._id, songs[374]._id, songs[375]._id, songs[376]._id, songs[377]._id, songs[378]._id, songs[379]._id],
            genre: 'Latin',
            year: '2019',
            priceVinyl: '10',
            priceDigital: '6',
            portrait: '61aZ-vbH5TL._SL1000_.jpg'
        }), new Album({
            name: 'El Círculo',
            artists: [artists[30]._id],
            songs: [songs[380]._id, songs[381]._id, songs[382]._id, songs[383]._id, songs[384]._id, songs[385]._id, songs[386]._id, songs[387]._id, songs[388]._id, songs[390]._id, songs[391]._id, songs[392]._id, songs[393]._id, songs[394]._id, songs[395]._id, songs[396]._id, songs[397]._id],
            genre: 'Hip-hop',
            year: '2016',
            priceVinyl: '10',
            priceDigital: '6',
            portrait: '51iaVGan3SL.jpg'
        }), new Album({
            name: 'Bruja',
            artists: [artists[31]._id],
            songs: [songs[398]._id, songs[399]._id, songs[400]._id, songs[401]._id, songs[402]._id, songs[403]._id, songs[404]._id, songs[405]._id, songs[406]._id, songs[407]._id, songs[408]._id, songs[409]._id],
            genre: 'Hip-hop',
            year: '2013',
            priceVinyl: '10',
            priceDigital: '6',
            portrait: '81dWNMp-V4L._SS500_.jpg'
        }), new Album({
            name: 'Lemonade',
            artists: [artists[32]._id],
            songs: [songs[410]._id, songs[411]._id, songs[412]._id, songs[413]._id, songs[414]._id, songs[415]._id, songs[416]._id, songs[417]._id, songs[418]._id, songs[419]._id, songs[420]._id, songs[421]._id],
            genre: 'Pop',
            year: '2016',
            priceVinyl: '10',
            priceDigital: '6',
            portrait: '81Whn8vzjgL._SL1200_.jpg'
        }), new Album({
            name: 'Anti',
            artists: [artists[33]._id],
            songs: [songs[422]._id, songs[423]._id, songs[424]._id, songs[425]._id, songs[426]._id, songs[427]._id, songs[428]._id, songs[429]._id, songs[430]._id, songs[431]._id, songs[432]._id, songs[433]._id, songs[434]._id],
            genre: 'Pop',
            year: '2016',
            priceVinyl: '10',
            priceDigital: '6',
            portrait: '71zGOU7Bj4L._SL1500_.jpg'
        }), new Album({
            name: 'My Name Is Michael Holbrook',
            artists: [artists[34]._id],
            songs: [songs[435]._id, songs[436]._id, songs[437]._id, songs[438]._id, songs[439]._id, songs[440]._id, songs[441]._id, songs[442]._id, songs[443]._id, songs[444]._id, songs[445]._id, songs[446]._id, songs[447]._id],
            genre: 'Pop',
            year: '2019',
            priceVinyl: '10',
            priceDigital: '6',
            portrait: '81DjGOPurhL._SL1200_.jpg'
        }), new Album({
            name: 'When We All Fall Asleep, Where Do We Go?',
            artists: [artists[35]._id],
            songs: [songs[448]._id, songs[449]._id, songs[450]._id, songs[451]._id, songs[452]._id, songs[453]._id, songs[454]._id, songs[455]._id, songs[456]._id, songs[457]._id, songs[458]._id, songs[459]._id, songs[460]._id, songs[461]._id],
            genre: 'Pop',
            year: '2019',
            priceVinyl: '10',
            priceDigital: '6',
            portrait: '61e23dfEOBL._SL1400_.jpg'
        }), new Album({
            name: 'Gemini',
            artists: [artists[36]._id],
            songs: [songs[462]._id, songs[463]._id, songs[464]._id, songs[465]._id, songs[466]._id, songs[467]._id, songs[468]._id, songs[469]._id, songs[470]._id, songs[471]._id, songs[472]._id, songs[473]._id, songs[474]._id, songs[475]._id, songs[476]._id, songs[477]._id],
            genre: 'Hip-hop',
            year: '2017',
            priceVinyl: '10',
            priceDigital: '6',
            portrait: '51A2GbWmk8L.jpg'
        }), new Album({
            name: 'Valiente',
            artists: [artists[37]._id],
            songs: [songs[478]._id, songs[479]._id, songs[480]._id, songs[481]._id, songs[482]._id, songs[483]._id, songs[484]._id, songs[485]._id, songs[486]._id, songs[487]._id, songs[488]._id, songs[489]._id, songs[490]._id],
            genre: 'Latin',
            year: '2018',
            priceVinyl: '10',
            priceDigital: '6',
            portrait: '43879886_10156931914868699_1974031926326984704_n.jpg'
        }), new Album({
            name: 'Stories from the City, Stories from the Sea',
            artists: [artists[38]._id],
            songs: [songs[491]._id, songs[492]._id, songs[493]._id, songs[494]._id, songs[495]._id, songs[496]._id, songs[497]._id, songs[498]._id, songs[499]._id, songs[500]._id, songs[501]._id, songs[502]._id],
            genre: 'Rock',
            year: '2000',
            priceVinyl: '10',
            priceDigital: '6',
            portrait: '71Ucz7Q0slL._SL1400_.jpg'
        }), new Album({
            name: 'Something Else',
            artists: [artists[39]._id],
            songs: [songs[503]._id, songs[504]._id, songs[505]._id, songs[506]._id, songs[507]._id, songs[508]._id, songs[509]._id, songs[510]._id, songs[511]._id, songs[512]._id, songs[513]._id, songs[514]._id, songs[515]._id],
            genre: 'Rock',
            year: '2017',
            priceVinyl: '10',
            priceDigital: '6',
            portrait: 'A1YsfKTsjcL._SL1500_.jpg'
        }), new Album({
            name: 'Wish You Were Here',
            artists: [artists[40]._id],
            songs: [songs[516]._id, songs[517]._id, songs[518]._id, songs[519]._id, songs[520]._id],
            genre: 'Rock',
            year: '1975',
            priceVinyl: '10',
            priceDigital: '6',
            portrait: '61LYfqeXUDL._AC_SL1000_.jpg'
        }), new Album({
            name: 'Back to Black',
            artists: [artists[41]._id],
            songs: [songs[521]._id, songs[522]._id, songs[523]._id, songs[524]._id, songs[525]._id, songs[526]._id, songs[527]._id, songs[528]._id, songs[529]._id, songs[530]._id, songs[531]._id],
            genre: 'Soul',
            year: '2006',
            priceVinyl: '10',
            priceDigital: '6',
            portrait: '71caoKZoCsL._SL1400_.jpg'
        }), new Album({
            name: 'Ocean',
            artists: [artists[42]._id],
            songs: [songs[532]._id, songs[533]._id, songs[534]._id, songs[535]._id, songs[536]._id, songs[537]._id, songs[538]._id, songs[539]._id, songs[540]._id, songs[541]._id, songs[542]._id, songs[543]._id, songs[544]._id, songs[545]._id, songs[546]._id, songs[547]._id],
            genre: 'Latin',
            year: '2019',
            priceVinyl: '10',
            priceDigital: '6',
            portrait: '71JZuzIxXEL._SS500_.jpg'
        }), new Album({
            name: 'Good Thing',
            artists: [artists[43]._id],
            songs: [songs[548]._id, songs[549]._id, songs[550]._id, songs[551]._id, songs[552]._id, songs[553]._id, songs[554]._id, songs[555]._id, songs[556]._id, songs[557]._id],
            genre: 'Soul',
            year: '2018',
            priceVinyl: '10',
            priceDigital: '6',
            portrait: '61bI3dqP2PL._SL1424_.jpg'
        }), new Album({
            name: 'The Truth EP',
            artists: [artists[44]._id],
            songs: [songs[558]._id, songs[559]._id, songs[560]._id, songs[561]._id, songs[562]._id, songs[563]._id, songs[564]._id],
            genre: 'Soul',
            year: '2017',
            priceVinyl: '10',
            priceDigital: '6',
            portrait: '81xe6wIdoDL._SS500_.jpg'
        }), new Album({
            name: 'Not Waving, But Drowning',
            artists: [artists[45]._id],
            songs: [songs[565]._id, songs[566]._id, songs[567]._id, songs[568]._id, songs[569]._id, songs[570]._id, songs[571]._id, songs[572]._id, songs[573]._id, songs[574]._id, songs[575]._id, songs[576]._id, songs[577]._id, songs[578]._id, songs[579]._id],
            genre: 'Hip-hop',
            year: '2019',
            priceVinyl: '10',
            priceDigital: '6',
            portrait: '81NEqfcX7ZL._SS500_.jpg'
        }), new Album({
            name: 'La Enamorada',
            artists: [artists[46]._id],
            songs: [songs[580]._id, songs[581]._id, songs[582]._id, songs[583]._id, songs[584]._id, songs[585]._id, songs[586]._id, songs[587]._id, songs[588]._id],
            genre: 'Latin',
            year: '2019',
            priceVinyl: '10',
            priceDigital: '6',
            portrait: '71uFMq4y3BL._SS500_.jpg'
        }), new Album({
            name: 'OPUS',
            artists: [artists[47]._id],
            songs: [songs[589]._id, songs[590]._id, songs[591]._id, songs[592]._id, songs[593]._id, songs[594]._id, songs[595]._id, songs[596]._id, songs[597]._id, songs[598]._id],
            genre: 'Latin',
            year: '2019',
            priceVinyl: '10',
            priceDigital: '6',
            portrait: '713tQrCb5SL._SL1227_.jpg'
        }), new Album({
            name: 'F.Y.A.H.',
            artists: [artists[48]._id],
            songs: [songs[599]._id, songs[600]._id, songs[601]._id, songs[602]._id, songs[603]._id, songs[604]._id, songs[605]._id, songs[606]._id, songs[607]._id, songs[608]._id, songs[609]._id, songs[610]._id],
            genre: 'Reggae',
            year: '2018',
            priceVinyl: '10',
            priceDigital: '6',
            portrait: '71M2x82-lAL._SL1000_.jpg'
        }), new Album({
            name: 'Unconquerebel',
            artists: [artists[49]._id],
            songs: [songs[611]._id, songs[612]._id, songs[613]._id, songs[614]._id, songs[615]._id, songs[616]._id, songs[617]._id, songs[618]._id, songs[619]._id, songs[620]._id, songs[621]._id, songs[622]._id, songs[623]._id],
            genre: 'Reggae',
            year: '2017',
            priceVinyl: '10',
            priceDigital: '6',
            portrait: '71KIlDYBTlL._SS500_.jpg'
        }), new Album({
            name: 'Who Feels It Knows It',
            artists: [artists[50]._id],
            songs: [songs[624]._id, songs[625]._id, songs[626]._id, songs[627]._id, songs[628]._id, songs[629]._id, songs[630]._id, songs[631]._id, songs[632]._id, songs[633]._id],
            genre: 'Reggae',
            year: '2005',
            priceVinyl: '10',
            priceDigital: '6',
            portrait: '61oiSrpn0HL.jpg'
        }), new Album({
            name: 'There\'s No Place Like America Today',
            artists: [artists[51]._id],
            songs: [songs[634]._id, songs[635]._id, songs[636]._id, songs[637]._id, songs[638]._id, songs[639]._id, songs[640]._id],
            genre: 'Soul',
            year: '1975',
            priceVinyl: '10',
            priceDigital: '6',
            portrait: '61V9hiK9aHL.jpg'
        }), new Album({
            name: 'Dock of the Bay Sessions',
            artists: [artists[52]._id],
            songs: [songs[641]._id, songs[642]._id, songs[643]._id, songs[644]._id, songs[645]._id, songs[646]._id, songs[647]._id, songs[648]._id, songs[649]._id, songs[650]._id, songs[651]._id, songs[652]._id],
            genre: 'Soul',
            year: '2018',
            priceVinyl: '10',
            priceDigital: '6',
            portrait: '91rZTJmui1L._SS500_.jpg'
        }), new Album({
            name: 'Where Did Our Love Go',
            artists: [artists[53]._id],
            songs: [songs[653]._id, songs[654]._id, songs[655]._id, songs[656]._id, songs[657]._id, songs[658]._id, songs[659]._id, songs[660]._id, songs[661]._id, songs[662]._id, songs[663]._id, songs[664]._id],
            genre: 'Soul',
            year: '1964',
            priceVinyl: '10',
            priceDigital: '6',
            portrait: 'R-11611485-1519404367-9762.jpg'
        }), new Album({
            name: 'Wallflower',
            artists: [artists[54]._id],
            songs: [songs[665]._id, songs[666]._id, songs[667]._id, songs[668]._id, songs[669]._id, songs[670]._id, songs[671]._id, songs[672]._id, songs[673]._id, songs[674]._id, songs[675]._id],
            genre: 'Soul',
            year: '2017',
            priceVinyl: '10',
            priceDigital: '6',
            portrait: '91GJgcSDVlL._SL1200_.jpg'
        }), new Album({
            name: 'Roots in the Air',
            artists: [artists[55]._id],
            songs: [songs[676]._id, songs[677]._id, songs[678]._id, songs[679]._id, songs[680]._id, songs[681]._id, songs[682]._id, songs[683]._id],
            genre: 'Reggae',
            year: '2017',
            priceVinyl: '10',
            priceDigital: '6',
            portrait: '81ZEL+3uiHL._SL1500_.jpg'
        }), new Album({
            name: 'Excita',
            artists: [artists[56]._id],
            songs: [songs[684]._id, songs[685]._id, songs[686]._id, songs[687]._id, songs[688]._id, songs[689]._id, songs[690]._id],
            genre: 'Reggae',
            year: '2018',
            priceVinyl: '10',
            priceDigital: '6',
            portrait: '91pHAXWzbgL._SS500_.jpg'
        }), new Album({
            name: 'Jah Fire',
            artists: [artists[57]._id],
            songs: [songs[691]._id, songs[692]._id, songs[693]._id, songs[694]._id, songs[695]._id, songs[696]._id, songs[697]._id, songs[698]._id],
            genre: 'Reggae',
            year: '2007',
            priceVinyl: '10',
            priceDigital: '6',
            portrait: '91-CSqaBusL._SL1500_.jpg'
        }), new Album({
            name: 'More Work to Be Done',
            artists: [artists[58]._id],
            songs: [songs[699]._id, songs[700]._id, songs[701]._id, songs[702]._id, songs[703]._id, songs[704]._id, songs[705]._id, songs[706]._id, songs[707]._id, songs[708]._id, songs[709]._id],
            genre: 'Reggae',
            year: '2019',
            priceVinyl: '10',
            priceDigital: '6',
            portrait: '91EgOff2l6L._SL1500_.jpg'
        }), new Album({
            name: '24K Magic',
            artists: [artists[59]._id],
            songs: [songs[710]._id, songs[711]._id, songs[712]._id, songs[713]._id, songs[714]._id, songs[715]._id, songs[716]._id, songs[717]._id, songs[718]._id],
            genre: 'Pop',
            year: '2016',
            priceVinyl: '10',
            priceDigital: '6',
            portrait: '716mnZd24EL._SL1425_.jpg'
        }), new Album({
            name: 'Divide',
            artists: [artists[60]._id],
            songs: [songs[719]._id, songs[720]._id, songs[721]._id, songs[722]._id, songs[723]._id, songs[724]._id, songs[725]._id, songs[726]._id, songs[727]._id, songs[728]._id, songs[729]._id, songs[730]._id, songs[731]._id, songs[732]._id, songs[733]._id, songs[734]._id],
            genre: 'Pop',
            year: '2017',
            priceVinyl: '10',
            priceDigital: '6',
            portrait: 'B1HYJn9MrPS._SL1500_.jpg'
        }), new Album({
            name: '(What\'s the Story) Morning Glory?',
            artists: [artists[61]._id],
            songs: [songs[735]._id, songs[736]._id, songs[737]._id, songs[738]._id, songs[739]._id, songs[740]._id, songs[741]._id, songs[742]._id, songs[743]._id, songs[744]._id, songs[745]._id],
            genre: 'Rock',
            year: '1995',
            priceVinyl: '10',
            priceDigital: '6',
            portrait: 'A1ZhbDFiVtL._SS500_.jpg'
        }), new Album({
            name: 'Horses',
            artists: [artists[62]._id],
            songs: [songs[746]._id, songs[747]._id, songs[748]._id, songs[749]._id, songs[750]._id, songs[751]._id, songs[752]._id, songs[753]._id],
            genre: 'Rock',
            year: '1975',
            priceVinyl: '10',
            priceDigital: '6',
            portrait: '71Y92VZcpfL._SL1500_.jpg'
        }), new Album({
            name: 'Colores',
            artists: [artists[63]._id],
            songs: [songs[754]._id, songs[755]._id, songs[756]._id, songs[757]._id, songs[758]._id, songs[759]._id, songs[760]._id, songs[761]._id, songs[762]._id, songs[763]._id],
            genre: 'Latin',
            year: '2020',
            priceVinyl: '10',
            priceDigital: '6',
            portrait: '81PX5QopjSL._SS500_.jpg'
        }), new Album({
            name: 'El alma al aire',
            artists: [artists[64]._id],
            songs: [songs[764]._id, songs[765]._id, songs[766]._id, songs[767]._id, songs[768]._id, songs[769]._id, songs[770]._id, songs[771]._id, songs[772]._id, songs[773]._id],
            genre: 'Latin',
            year: '2000',
            priceVinyl: '10',
            priceDigital: '6',
            portrait: '71sUAvtJYfL._SL1441_.jpg'
        }), new Album({
            name: 'Yipiyou',
            artists: [artists[65]._id],
            songs: [songs[774]._id, songs[775]._id, songs[776]._id, songs[777]._id, songs[778]._id, songs[779]._id, songs[780]._id, songs[781]._id, songs[782]._id, songs[783]._id, songs[784]._id, songs[785]._id, songs[786]._id, songs[787]._id, songs[788]._id],
            genre: 'Hip-hop',
            year: '2018',
            priceVinyl: '10',
            priceDigital: '6',
            portrait: '71NRsI0a9sL._SS500_.jpg'
        }), new Album({
            name: 'Jackboys',
            artists: [artists[66]._id],
            songs: [songs[789]._id, songs[790]._id, songs[791]._id, songs[792]._id, songs[793]._id, songs[794]._id, songs[795]._id],
            genre: 'Hip-hop',
            year: '2019',
            priceVinyl: '10',
            priceDigital: '6',
            portrait: '81HjSc2dqxL._SS500_.jpg'
        }), new Album({
            name: 'Light',
            artists: [artists[67]._id],
            songs: [songs[796]._id, songs[797]._id, songs[798]._id, songs[799]._id, songs[800]._id, songs[801]._id, songs[802]._id, songs[803]._id, songs[804]._id, songs[805]._id],
            genre: 'Reggae',
            year: '2009',
            priceVinyl: '10',
            priceDigital: '6',
            portrait: '51idCkfeg0L._SL1500_.jpg'
        }), new Album({
            name: 'Rasta Pon Top',
            artists: [artists[68]._id],
            songs: [songs[806]._id, songs[807]._id, songs[808]._id, songs[809]._id, songs[810]._id, songs[811]._id, songs[812]._id, songs[813]._id, songs[814]._id, songs[815]._id],
            genre: 'Reggae',
            year: '1975',
            priceVinyl: '10',
            priceDigital: '6',
            portrait: '71bc2sNUGgL._SS500_.jpg'
        }), new Album({
            name: 'In Square Circle',
            artists: [artists[69]._id],
            songs: [songs[816]._id, songs[817]._id, songs[818]._id, songs[819]._id, songs[820]._id, songs[821]._id, songs[822]._id, songs[823]._id, songs[824]._id, songs[825]._id],
            genre: 'Soul',
            year: '1985',
            priceVinyl: '10',
            priceDigital: '6',
            portrait: '91rr40vJzaL._SL1400_.jpg'
        }), new Album({
            name: 'The New Look',
            artists: [artists[70]._id],
            songs: [songs[826]._id, songs[827]._id, songs[828]._id, songs[829]._id, songs[830]._id, songs[831]._id, songs[832]._id, songs[833]._id, songs[834]._id, songs[835]._id, songs[836]._id],
            genre: 'Soul',
            year: '1966',
            priceVinyl: '10',
            priceDigital: '6',
            portrait: '71m5fdBpLcL._SS500_.jpg'
        }))

        songs.forEach(song => {
            if (song.file) {
                fs.copyFile(path.join(__dirname, song.file), path.join(__dirname, `../../data/songs/${song._id}.mp3`), (err) => {
                    if (err) throw err;
                    console.log('source.txt was copied to destination.txt');
                });

                song.file = `${song._id}.mp3`
            }
        })

        albums.forEach(album => {
            fs.copyFile(path.join(`${__dirname}/../portraits`, album.portrait), path.join(__dirname, `../../data/portraits/${album._id}.jpeg`), (err) => {
                if (err) throw err;
                console.log('source.txt was copied to destination.txt');
            });

            album.portrait = `${album._id}.jpeg`
        })

        return Promise.all(Artist.create(artists).then(() => { Song.create(songs) }).then(() => Album.create(albums)).then(() => mongoose.disconnect()))
    })
