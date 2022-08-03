import React, { useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import listCards from '../data';
import Slider from 'react-slick';
import {BrowserRouter as Router, Link} from 'react-router-dom';


function Cards() {
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
        <div>"hello"</div>
            <Slider {...settings}>
            {listCards.map((currentCard) => {
                return( <Card  currentCard={currentCard}/>
                )
            })}
            </Slider>
        </div>
    )
}


function Card({currentCard}) {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="card" >
        <div className="card-top">
            <img src={currentCard.coverImageUrl}/>
            <h1>{currentCard.title}</h1>
        </div>  
        <Router>
            <div className='buttonstyle'>
                {/* <button1>❤️</button1> */}
                <Link to="/about">
                    <button2>User-link 🙂 </button2> 
                </Link>
            </div>
            </Router>
        
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
}

export default Cards