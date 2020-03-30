import React, { useEffect, useState } from 'react'
import BestSellings from './Best-sellings'
import { retrieveBestSellings } from '../logic'
import Feedback from './Feedback'
import './Results-best-sellings.sass'

export default ({ onAddToCart }) => {
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

    return <section className="best-sellings__background">
        <h1>Discover our BEST SELLING Albums:</h1><br />
        {error && <Feedback message={error} level='error' />}
        <section className='best-sellings__ranking'>
            <section className='best-sellings__positions'>
                <h2 className='best-sellings__numbers'>#1</h2>
                <h2 className='best-sellings__numbers'>#2</h2>
                <h2 className='best-sellings__numbers'>#3</h2>
                <h2 className='best-sellings__numbers'>#4</h2>
                <h2 className='best-sellings__numbers'>#5</h2>
            </section>
            <section className='best-sellings__display'>
                {bestSellings.map((album, index) => <BestSellings key={index} bestSellings={album} onAddToCart={onAddToCart} />)}
            </section>
        </section>
    </section>

}