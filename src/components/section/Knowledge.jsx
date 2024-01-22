
import React from 'react'
import BackgroundVideo from './background/backgroundVideo'
import importAll from '../../util/index'

const Knowledge = () => {
  // Importa las imágenes de la carpeta 'img/icon'
  const images = importAll(require.context('../../../public/img/knowledge', false, /\.(png|jpe?g|svg)$/))

  return (
    <div className='knowledge' id='knowledge'>
      <h2>Tech Stack</h2>
      <div className='imagesKnowledge'>
        {images.map((imagen, index) => (
          <img key={index} src={imagen.src} alt={imagen.alt} />
        ))}
      </div>
      <BackgroundVideo video='backgroundKnowledge.mp4'/>
    </div>
  )
}

export default Knowledge