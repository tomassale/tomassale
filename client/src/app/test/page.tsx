"use client"
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function Project() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Datos de prueba para que visualices el diseño YA MISMO
    const mockData = [
      { _id: '1', title: 'West Drip', img: '', icons: { react: 'react.svg', js: 'js.svg' } },
      { _id: '2', title: 'Photographer', img: '', icons: { next: 'next.svg', tailwind: 'tailwind.svg' } },
      { _id: '3', title: 'E-commerce', img: '', icons: { node: 'node.svg', mongo: 'mongo.svg' } },
      { _id: '4', title: 'Portfolio', img: '', icons: { vue: 'vue.svg' } },
    ];
    
    fetch('/data/project.json')
      .then(res => res.json())
      .then(res => setData(res))
      .catch(() => setData(mockData))
  }, [])

  return (
    // 1. Contenedor principal con overflow-hidden para evitar scroll horizontal en la página
    <div className='project py-20 min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center overflow-hidden' id='portfolio'>
      <h2 className="text-4xl font-bold mb-16 text-gray-200">Personal projects</h2>
      
      <div className='w-full max-w-5xl px-4 relative'>
        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView={'auto'}
          initialSlide={1} // Empieza en el del medio para que se vea bien de entrada
          
          // 2. AJUSTE CLAVE: spaceBetween para evitar que se monten encima
          spaceBetween={40} 
          
          coverflowEffect={{
            rotate: 0,      
            stretch: 0,     
            depth: 100,     
            modifier: 2.5,  
            slideShadows: false, 
          }}
          
          pagination={{ clickable: true, dynamicBullets: true }}
          modules={[EffectCoverflow, Pagination, Autoplay]}
          
          // 3. SOLUCIÓN AL CORTE: !overflow-visible permite que el brillo/borde salga del slide
          className="mySwiper !overflow-visible !pb-12"
        >
          {data.map((project) => (
            <SwiperSlide key={project._id} className="!w-[300px] !h-[400px] sm:!w-[350px]">
              {/* Render prop para detectar si es el slide activo (opcional, para efectos extra) */}
              {({ isActive }) => (
                <div className={`w-full h-full relative transition-all duration-500 ${isActive ? 'scale-100 z-50' : 'scale-90 opacity-60'}`}>
                  
                  {/* BORDE NEÓN (GRADIENTE) */}
                  <div className={`absolute -inset-[2px] rounded-2xl bg-gradient-to-br from-purple-600 to-cyan-400 opacity-75 blur-sm transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`}></div>
                  
                  {/* BORDE FINO VISIBLE */}
                  <div className="w-full h-full p-[2px] rounded-2xl bg-gradient-to-br from-purple-600 to-cyan-400 relative z-10">
                    
                    {/* CONTENIDO INTERNO */}
                    <div className="w-full h-full bg-[#121212] rounded-2xl flex flex-col overflow-hidden">
                      
                      {/* Imagen */}
                      <div className="h-48 w-full relative bg-[#1a1a1a] group overflow-hidden">
                        {project.img ? (
                          <Image src={project.img} alt={project.title} fill className="object-cover transition-transform duration-500 group-hover:scale-110"/>
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-700 font-mono text-sm">
                            No Image
                          </div>
                        )}
                        {/* Overlay sutil sobre la imagen */}
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                      </div>

                      {/* Info */}
                      <div className="flex-1 p-5 flex flex-col justify-between relative">
                         {/* Brillo de fondo sutil */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none"></div>

                        <div>
                          <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                            {project.title}
                          </h3>
                        </div>

                        <div className="flex items-center gap-3 mt-4">
                            {project.icons && Object.keys(project.icons).map((iconKey) => (
                              <div key={iconKey} className="relative w-7 h-7 hover:scale-110 transition-transform">
                                <Image src={`/img/personal/icons/${project.icons[iconKey]}`} fill className="object-contain" alt={iconKey} />
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}