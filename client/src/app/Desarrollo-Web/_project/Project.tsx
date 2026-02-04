"use client"
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-coverflow';

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
      
      <Swiper
        className="gridCard"
        effect={'coverflow'}
        loop={true}
        loopAdditionalSlides={3}
        centeredSlides={true}
        slidesPerView={'auto'}
        initialSlide={2}
        coverflowEffect={{
          rotate: 20,
          stretch: 150,
          depth: 250,
          modifier: 1,
          slideShadows: true,
        }}

        modules={[EffectCoverflow]}
      >
        {data.map((project: { _id: string, img: string, title: string, icons: { [key: string]: string } }) => (
          <SwiperSlide key={project._id} className='flip-card'>
            <div className='flip-card-inner'>
              <div className='flip-card-front'>
                
                <div className='profileMedia'>
                  {project.img && (
                    <Image 
                      src={project.img} 
                      alt={project.title} 
                      fill 
                      sizes="(max-width: 768px) 100vw, 350px"
                    />
                  )}
                </div>

                <div className='name'>
                  {project.title}
                </div>

                <div className='tech'>
                  {project.icons && Object.keys(project.icons).map((iconKey) => (
                    <Image 
                      key={iconKey} 
                      src={`/img/skills/${project.icons[iconKey]}`} 
                      width={35} 
                      height={35} 
                      alt='tech' 
                    />
                  ))}
                </div>

              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}