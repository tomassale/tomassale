"use client"
import { useState, useEffect } from 'react'


import 'swiper/css';
import 'swiper/css/effect-coverflow';
import ProjectSwiper from './ProjectSwiper';

export default function Project() {

  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/data/project.json')
      .then(res => res.json())
      .then(res => setData(res))
      .catch(err => console.error(err));
  }, [])

  return (
    <div className='project' id='portfolio'>
      <h2>Portfolio</h2>
      <ProjectSwiper cards={data}/>
    </div>
  )
}