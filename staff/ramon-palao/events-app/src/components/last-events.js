import React from 'react'

export default function({lastEvents}){
    const {title, description, date, location, publisher, created, subscribers } = lastEvents
    return <section>
        <h1>{title}</h1>
        <h2>{description}</h2>
        <h4>{date}</h4>
        <h4>{location}</h4>
        <h4>Publisher: {publisher}</h4>
        <h4>Event created: {created}</h4>
        <h4>date</h4>
    </section>
}