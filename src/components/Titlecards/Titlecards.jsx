import React, { useEffect, useRef, useState } from 'react';
import './Titlecards.css';
import cards_data from '../../assets/cards/Cards_data';
import { Link } from 'react-router-dom';


const Titlecards = ({ title, category }) => {

  const [apiData, setApiData] = useState([]);

  const cardsRef = useRef(); 

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaX;
  }

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json', 
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3N2VmMDRhNmZmYjhkZTRjYjA5NzZjMTE1YWY1Y2RiOSIsIm5iZiI6MTc1NDcyNzcyMC43MjgsInN1YiI6IjY4OTcwNTI4MzVlMGUyZDIxMDZkNjJmYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ejx6Lpo95Nz3GTj21K1Fp4Hm3Op0N5ZgSu-sfLI5a98'
      }
    };

    fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
      .then(res => res.json())
      .then(res => setApiData(res.results))
      .catch(err => console.error(err));

    cardsRef.current.addEventListener('wheel', handleWheel);
  }, [])

  return (
    <div className='title-cards'>
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => {
          return <Link to={`/player/${card.id}`} className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500` + card.backdrop_path} alt="" />
            <p>{card.original_title}</p>
          </Link>
        })}
      </div>
    </div>
  )
}

export default Titlecards