"use client"
import { useState } from 'react';
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
  // Seguimos el slide central por realIndex de Swiper (confiable en loop) en vez de
  // depender de la clase swiper-slide-active del DOM, que se desincroniza al retroceder.
  const [activeIndex, setActiveIndex] = useState(0)

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
          onSwiper={(swiper) => setActiveIndex(swiper.realIndex)}
          onRealIndexChange={(swiper) => setActiveIndex(swiper.realIndex)}
          breakpoints={{
            // 'auto' respeta el ancho CSS de la card (280px) en vez de estirarla al 100% del viewport
            0: { slidesPerView: 'auto' },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {cards.map((project, index) => (
            <SwiperSlide
              key={project._id}
              className={`flip-card${index === activeIndex ? ' is-active' : ''}`}
            >
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