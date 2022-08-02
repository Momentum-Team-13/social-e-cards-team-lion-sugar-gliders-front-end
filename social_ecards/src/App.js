import './allcards.css';
import React, { useEffect, useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import listCards from './data.js';
import Cards from './Components/Allcardscomponent'



function App() {
    const [currentCard, setCurrentCard] = useState(listCards[0])
    const [currentCardIndex] = useState(0)
    useEffect(() => {setCurrentCard(listCards[currentCardIndex])})

return(
    <>
        <div className=''>
            <h1>All user cards</h1>
            <Cards currentCard={currentCard}/>
        </div>
    </>
    )
}

export default App