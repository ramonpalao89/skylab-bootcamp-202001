import React from 'react'
import './Profile.sass'

export default ({onSubmit, user}) => {

    return <section class="profile-detail">
    <section class="profile-detail__user">
        <h1 class="profile-detail__name">Ramon Palao</h1>
        <img src="avatar.jpg" class="profile-detail__avatar"/>
        <form class="profile-detail__form" onSubmit={event => {
            event.preventDefault()

            const name = event.target.name.value
            const surname = event.target.surname.value
            const email = event.target.email.value
            const city = event.target.city.value
            const birth = event.target.birth.value
            const password = event.target.password.value
            const newPassword = event.target.newPassword.value

            const newUser = {name, surname, email, city, birth, password, newPassword}

            onSubmit(newUser)

        }}>
            <input type="text" name="name" defaultValue={user.name}/><br/>
            <input type="text" name="surname" defaultValue={user.surname}/><br/>
            <input type="text" name="email" defaultValue={user.email}/><br/>
            <input type="text" name="city" defaultValue={user.city}/><br/>
            <input type="text" name="birth" defaultValue={user.birth} /><br/>
            <p>Do you want to change your password??</p><br/>
            <input type="password" name="password" placeholder="Enter your old password" /><br/>
            <input type="password" name="newPassword" placeholder="Enter your new password" /><br/>
            <button>UPDATE YOUR PROFILE</button><br/>
        </form>
    </section>
    <section class="profile-detail__info">
        <h1 class="profile-detail__title"><i class="fas fa-award"></i> Most Listened SONGS:</h1>
        <section class="profile-detail__listened">
            <p class="profile-detail__song">1 - Is This Love - BOB MARLEY</p>
            <p class="profile-detail__song">2 - No Woman No Cry - BOB MARLEY</p>
            <p class="profile-detail__song">3 - Could you be loved - BOB MARLEY</p>
            <p class="profile-detail__song">4 - Three Little Birds - BOB MARLEY</p>
            <p class="profile-detail__song">5 - Buffalo Soldier - BOB MARLEY</p>
        </section>
        <section class="profile-detail__fav-artist"><br/>
            <h1 class="profile-detail__artist"><i class="fas fa-trophy"></i> Most Listened ARTIST:</h1><br/>
            <h2 class="profile-detail__artist-name">BOB MARLEY</h2><br/>
            <img src="bob.jpeg" class="profile-detail__artist-pic"/>
        </section><br/>
        <section class="profile-detail__purchased"><br/>
            <h1 class="profile-detail__purchased-list"><i class="fas fa-shopping-cart"></i> Purchased ALBUMS:</h1><br/>
            <section class="profile-detail__purchased-albums">
                <section>
                    <img src="bob.jpeg" class="profile-detail__purchased-pic"/>
                    <p>Bob Marley - Legend</p>
                </section>
                <section>
                    <img src="bob.jpeg" class="profile-detail__purchased-pic"/>
                    <p>Bob Marley - Legend</p>
                </section>
                <section>
                    <img src="bob.jpeg" class="profile-detail__purchased-pic"/>
                    <p>Bob Marley - Legend</p>
                </section>
            </section>
        </section>
    </section>
</section>
}