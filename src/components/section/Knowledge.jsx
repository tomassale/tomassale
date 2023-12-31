import React from 'react';

const Knowledge = () => {
  // Importa las imágenes de la carpeta 'img/icon'
  const imagenes = importAll(require.context('../../../public/img/icon', false, /\.(png|jpe?g|svg)$/));

  // Función para importar todas las imágenes
  function importAll(r) {
    return r.keys().map((archivo) => ({
      src: r(archivo),
      alt: `Imagen ${archivo}`,
    }));
  }

  return (
    <div className='knowledge' id='knowledge'>
      <h2>Mis conocimientos</h2>
      <div className='imagesKnowledge'>
        {imagenes.map((imagen, index) => (
          <img key={index} src={imagen.src} alt={imagen.alt} />
        ))}
      </div>
    </div>
  );
}

export default Knowledge;