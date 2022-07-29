import './Appallusers.css';
import React, { useEffect, useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// import Cards from './Components/Cardscomponent'
import {listCards} from './data.js';
import Slider from 'react-slick';
import {BrowserRouter as Router, Link} from 'react-router-dom';


function App() {
    const [currentCard, setCurrentCard] = useState(listCards[0])
    const [currentCardIndex, setCurrentCardIndex] = useState(0)
    useEffect(()=>{
        setCurrentCard(listCards[currentCardIndex])
    })

return(
    <>
        <div className=''>
            <Cards currentCard={currentCard}/>
        </div>
        </>
    )
}



function Cards() {
    
    const [expanded, setExpanded] = useState(false);
    const settings = {
        dots: true,
        infinite: true,
        speed: 280,     
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 0,
        adaptiveHeight: true,
        rows: 2,
        
    
        
    }
    
    
    return (
        <div className="container">
            <Slider {...settings}>
            {listCards.map((currentCard) => {
                return(
                <div className="card">
                    <div className="card-top">
                        <img src={currentCard.coverImageUrl}/>
                        <h1>{currentCard.title}</h1>
                    </div>  
                    <Router>
                        <div className='buttonstyle'>
                            <button1>❤️</button1>
                            <Link to="/about">
                                <button2>User-link</button2> 
                            </Link>
                        </div>
                        </Router>
                    

                    {/* <a href='https://www.pinterest.com/search/pins/?q=hayao%20miyazaki&rs=typed&term_meta[]=hayao%7Ctyped&term_meta[]=miyazaki%7Ctyped'>
                    <button2>👤</button2>
                </a> */}
                
                    
                    <div>
                    {expanded
                    ? <button onClick={() => setExpanded ( !expanded)}>Show less</button>
                    : <button onClick={() => setExpanded ( !expanded)}> Show more</button>}</div>
                    {expanded &&

                    <div className="more">
                    <h3>{currentCard.author}</h3>
                    <p>{currentCard.publicationDate}</p>
                    </div>}
                    
                </div>
                )
            })}
            </Slider>
        </div>
    )
}


export default App;




