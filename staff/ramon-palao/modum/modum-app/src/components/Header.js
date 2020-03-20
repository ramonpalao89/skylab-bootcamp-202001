import React, {useState} from 'react'
import './Header.sass'

export default ({user, genreButtonClick}) => {
    const {name, surname} = user

    return <div>
        <header>
            <nav className="upper-header">
                <ul>
                    {user && <li><a href=""><span className="user"><i className="fas fa-user"></i></span>{name} {surname}</a></li>}
                    <li><a href=""><span className="logo"><i></i></span>MODUM</a></li>
                    <li><a href=""><span className="buy"><i className="fas fa-shopping-cart"></i></span>BUY</a></li>
                    <li><a href=""><span className="search"><i className="fas fa-search"></i></span>SEARCH</a></li>
                </ul>
            </nav>
            <nav className="categories">
                <ul>
                    <li><a href=""><span className="home"><i className="fas fa-home "></i></span>HOME</a></li>
                    <li><a href=""><span className="genres"><i className="fas fa-music "></i></span>GENRES</a>
                        <ul>
                            <li><a href="">POP</a></li>
                            <li><a href="">HIP HOP</a></li>
                            <li><a href="" onClick={event => {
                                event.preventDefault()
                                genreButtonClick('rock')
                            }}>ROCK</a></li>
                            <li><a href="">LATIN</a></li>
                            <li><a href="" onClick={event => {
                                event.preventDefault()
                                genreButtonClick('Reggae')
                            }}>REGGAE</a></li>
                            <li><a href="">SOUL</a></li>
                        </ul>
                    </li>
                    <li><a href=""><span className="years"><i className="fas fa-sort-amount-down "></i></span>PUBLISHED YEAR</a>
                        <ul>
                            <li><a href="">LAST YEAR</a></li>
                            <li><a href="">LAST 2 YEARS</a></li>
                            <li><a href="">LAST 5 YEARS</a></li>
                            <li><a href="">LAST 10 YEARS</a></li>
                            <li><a href="">MORE THAN 10 YEARS AGO</a></li>
                        </ul>
                    </li>
                    <li><a href=""><span className="sellings"><i
                        className="fas fa-compact-disc "></i></span>BEST-SELLINGS</a></li>
                    <li><a href=""><span className="modum"><i className="fas fa-headphones-alt "></i></span>MY MODUM</a>
                        <ul>
                            <li><a href="">MY ALBUMS</a></li>
                            <li><a href="">MY PLAYLIST</a></li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </header>
    </div>
}