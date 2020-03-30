import React, { useState, useEffect } from 'react'
import MyAlbums from './My-albums'
import { retrievePurchasedAlbums } from '../logic'
import Feedback from './Feedback'

export default ({ onGoToDetail }) => {
    const [purchasedAlbums, setPurchased] = useState([])
    const [error, setError] = useState([])
    const digitalPurchased = []

    useEffect(() => {
        (async () => {
            try {
                const purchasedAlbums = await retrievePurchasedAlbums()
                setPurchased(purchasedAlbums)
            } catch (error) {
                setError(error)

                setTimeout(() => {
                    setError(undefined)
                }, 3000)

            }
        })()
    }, [])

    return <div>
        {error && <Feedback message={error} level='error'/>}
        {purchasedAlbums.forEach(item => item.format === 'digital' ? digitalPurchased.push(item) : '')}
        <h1 class="my-albums-title">My Albums</h1>
        {digitalPurchased.map((album, index) => <MyAlbums key={index} digitalPurchased={album} onGoToDetail={onGoToDetail} />)}
    </div>
}