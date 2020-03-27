import React from 'react'
import MyAlbums from './My-albums'

export default ({ purchasedAlbums, onGoToDetail }) => {
    const digitalPurchased = []
    return <div>
        {purchasedAlbums.forEach(item => item.format === 'digital' ? digitalPurchased.push(item) : '')}
        <h1 class="my-albums-title">My Albums</h1>
        {digitalPurchased.map((album, index) => <MyAlbums key={index} digitalPurchased={album} onGoToDetail={onGoToDetail}/>)}
    </div>
}