import React from 'react'

export default function({user, onGoToPublish, onGoToRetrievedPublished, onGoToLastEvents}){
    const {name} = user
    return <section>
        <h1>Welcome {name}</h1>
        <button onClick={event => {
            event.preventDefault()
            onGoToPublish()
        }}>PUBLISH YOUR EVENT</button>
        <button onClick={event => {
            event.preventDefault()
            onGoToRetrievedPublished()
        }}>SEE YOUR PUBLISHED EVENTS</button>
        <button onClick={event => {
            event.preventDefault()
            onGoToLastEvents()
        }}>SEE ALL EVENTS</button>
    </section>
}