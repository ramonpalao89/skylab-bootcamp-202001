import React, { useEffect, useState } from 'react'
import BestSellings from './Best-sellings'
import { retrieveBestSellings } from '../logic'
import Feedback from './Feedback'
// import './Results-item.sass'

export default ({ onGoToDetail }) => {
    const [bestSellings, setBestSellings] = useState([])
    const [error, setError] = useState([])

    useEffect(() => {
        (async () => {
            try {
                const bestSellings = await retrieveBestSellings()
                setBestSellings(bestSellings)
            } catch (error) {
                setError(error)

                setTimeout(() => {
                    setError(undefined)
                }, 3000)

            }
        })()
    }, [])

    return <section className="landing__pop">
        <h1>Discover our BEST SELLING Albums:</h1><br />
        {error && <Feedback message={error} level='error'/>}
        {bestSellings.map((album, index) => <BestSellings key={index} bestSellings={album} onGoToDetail={onGoToDetail} />)}
    </section>

}