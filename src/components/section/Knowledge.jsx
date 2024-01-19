
import React from 'react'

const Knowledge = () => {
  // Importa las imágenes de la carpeta 'img/icon'
  const imagenes = importAll(require.context('../../../public/img/knowledge', false, /\.(png|jpe?g|svg)$/))

  // Función para importar todas las imágenes
  function importAll(r) {
    return r.keys().map((archivo) => ({
      src: r(archivo),
      alt: `Imagen ${archivo}`,
    }))
  }

  return (
    <div className='knowledge' id='knowledge'>
      <h2>Tech Stack</h2>
      <div className='imagesKnowledge'>
        {imagenes.map((imagen, index) => (
          <img key={index} src={imagen.src} alt={imagen.alt} />
        ))}
      </div>
      <div className='backgroundVideo'>
        <video src="./video/background/backgroundKnowledge.mp4" preload='metadata' autoPlay muted loop disablePictureInPicture/>
      </div>
    </div>
  )
}

export default Knowledge