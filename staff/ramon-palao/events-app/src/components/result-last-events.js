import React from 'react'
import LastEvents from './last-events'

export default function ({lastEvents, setView}){
return <section>
    <a href="" onClick={event =>{
        event.preventDefault()
        setView('landing')
    }}>HOME PAGE</a>
    {lastEvents.map((event, index) => <LastEvents key={index} lastEvents={event}/>)}
</section>
}