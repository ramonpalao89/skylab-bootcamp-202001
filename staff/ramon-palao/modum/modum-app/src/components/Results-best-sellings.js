import React from 'react'
import BestSellings from './Best-sellings'
// import './Results-item.sass'

export default ({bestSellings, onGoToDetail}) => {

    return <section className="landing__pop">
        <h1>Discover our BEST SELLING Albums:</h1><br/>
        {bestSellings.map((album, index) => <BestSellings key={index} bestSellings={album} onGoToDetail={onGoToDetail}/>)}
    </section>

}