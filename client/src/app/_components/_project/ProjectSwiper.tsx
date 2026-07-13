"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow } from 'swiper/modules';
import ProjectCard from './ProjectCard';
import { ProjectData } from './ProjectCard';
import { useSettings } from '../_settings/SettingsProvider';

interface SwiperProps {
  readonly cards: ProjectData[];
}

export default function ProjectSwiper({ cards }: SwiperProps) {
  const { t } = useSettings()

  return (
    <div className="swiper-container-wrapper">
      {cards.length > 0 ? (
        <Swiper
          className="gridCard"
          effect={'coverflow'}
          loop={true}
          centeredSlides={true}
          slidesPerView={3}
          coverflowEffect={{
            rotate: 20,
            stretch: 0,
            depth: 250,
            modifier: 1,
            slideShadows: true,
          }}
          modules={[EffectCoverflow]}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {cards.map((project) => (
            <SwiperSlide key={project._id} className='flip-card'>
              <ProjectCard project={project} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div style={{ textAlign: 'center', padding: '20px', color: 'white' }}>
          {t('loadingProjects')}
        </div>
      )}
    </div>
  )
}