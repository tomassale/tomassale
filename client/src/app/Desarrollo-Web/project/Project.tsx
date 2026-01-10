"use client"
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

export default function Project() {

  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/data/project.json')
      .then(res => res.json())
      .then(res => setData(res))
      .then(res => console.log(res))
  }, [])

  return (
    <div className='project' id='portfolio'>
      <h2>Personal projects</h2>
      <Swiper
        className='gridCard'
        effect={'coverflow'}
        centeredSlides={true}
        slidesPerView={'auto'}
        initialSlide={1}
        spaceBetween={1}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
          slideShadows: false,
        }}
        modules ={[EffectCoverflow, Autoplay]}
      >
        {data.map((project: { _id: string, img: string, title: string, icons: { [key: string]: string } }) => (
          <SwiperSlide key={project._id} className='flip-card'>
            <div className='flip-card-inner'>
              <div className='flip-card-front'>
                <div className='profileMedia'>
                  {project.img && (
                    <Image src={project.img} alt='img' fill style={{ objectFit: 'cover' }}/>
                  )}
                </div>
                <div className='name'>
                  {project.title}
                </div>
                <div className='tech'>
                  {project.icons && Object.keys(project.icons).map((iconKey) => (
                    <Image key={iconKey} src={`/img/personal/icons/${project.icons[iconKey]}`} width={35} height={35} alt='technologies' />
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