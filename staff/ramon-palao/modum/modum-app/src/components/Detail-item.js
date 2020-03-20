import React from 'react'

export default ({albumDetail}) => {
const {artists} = albumDetail
    return <section>
        <section class="album-titles">
            <section>
                <h2 class="album-name">LEGEND (1984)</h2><br />
                <h2 class="album-artist">BOB MARLEY</h2><br />
                <h3 class="album-genre">Reggae</h3>
            </section>
            <section>
                <h2 class="album-rating">Rating: 9/10</h2>
            </section>
        </section>
        <section class="album-detail">
            <section>
                <img src="bob.jpeg" />
            </section>
            <section class="album-songs">
                <p>1 - Is This Love (3:00)</p>
                <p class="reproductor"><i class="fas fa-play-circle"></i> REPRODUCTOR</p><br />
                <p>2 - No Woman No Cry (3:00)</p>
                <p class="reproductor"><i class="fas fa-play-circle"></i> REPRODUCTOR</p><br />
                <p>3 - Could you be loved (3:00)</p>
                <p class="reproductor"><i class="fas fa-play-circle"></i> REPRODUCTOR</p><br />
                <p>4 - Three Little Birds (3:00)</p>
                <p class="reproductor"><i class="fas fa-play-circle"></i> REPRODUCTOR</p><br />
                <p>5 - Buffalo Soldier (3:00)</p>
                <p class="reproductor"><i class="fas fa-play-circle"></i> REPRODUCTOR</p><br />
                <p>6 - Get Up, Stand Up (3:00)</p>
                <p class="reproductor"><i class="fas fa-play-circle"></i> REPRODUCTOR</p><br />
                <p>7 - Stir It Up (3:00)</p>
                <p class="reproductor"><i class="fas fa-play-circle"></i> REPRODUCTOR</p><br />
                <p>8 - Easy Skanking (3:00)</p>
                <p class="reproductor"><i class="fas fa-play-circle"></i> REPRODUCTOR</p><br />
                <p>9 - One Love / People Get Ready (3:00)</p>
                <p class="reproductor"><i class="fas fa-play-circle"></i> REPRODUCTOR</p><br />
                <p>10 - I Shot The Sheriff (3:00)</p>
                <p class="reproductor"><i class="fas fa-play-circle"></i> REPRODUCTOR</p><br />
            </section>
        </section>
    </section>
}
