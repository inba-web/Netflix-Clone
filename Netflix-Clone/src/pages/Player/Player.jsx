import React, { useEffect, useState } from 'react';
import './Player.css';
import back_arrow_icon from "../../assets/back_arrow_icon.png";
import { useNavigate, useParams } from 'react-router-dom';

const Player = () => {

  const { id } = useParams(); 
  const navigate = useNavigate();

  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    type: ""
  });

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3N2VmMDRhNmZmYjhkZTRjYjA5NzZjMTE1YWY1Y2RiOSIsIm5iZiI6MTc1NDcyNzcyMC43MjgsInN1YiI6IjY4OTcwNTI4MzVlMGUyZDIxMDZkNjJmYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ejx6Lpo95Nz3GTj21K1Fp4Hm3Op0N5ZgSu-sfLI5a98'
    }
  };

  useEffect(() => { }, [
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
      .then(res => res.json())
      .then(res => setApiData(res.results[0]))
      .catch(err => console.error(err))
  ])


  return (
    
    <div className='player'>
      <img src={back_arrow_icon} alt="" onClick={() => {navigate('/')}}/>
      <iframe src={`https://www.youtube.com//embed/${apiData.key}`} title='trailer' allowFullScreen width='90%' height='90%' frameBorder="0"></iframe>
      <div className="player-info">
        <p>{apiData.published_at.slice(0, 10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  )

}

export default Player