  // Función para importar todas las imágenes de una carpeta
export default function importAll(r) {
    return r.keys().map((archivo) => ({
      src: r(archivo),
      alt: `Imagen ${archivo}`,
    }))
  }