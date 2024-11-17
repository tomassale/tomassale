import BackgroundVideo from "../background/backgroundVideo"
import Images from '../../../data/icons.json'

const Presentation = () => {
  return (
    <div className='aboutMe' id='aboutMe'>
      <div className='presentation'>
        <div className='description'>
          <h2>Tomás Javier Sale</h2>
          <h4>Web Developer</h4>
          <p>
          +2 años de experiencia en el desarrollo de software de alta calidad, aplicando diversas tecnologías para ofrecer soluciones efectivas, eficientes, buscando el análisis de requisitos y resolución de problemas. Amplio compromiso con las mejores prácticas de desarrollo y mejora continua, implementando tecnologías optimizadoras de rendimiento y usabilidad del software. Enfoque riguroso en la calidad y la atención al detalle garantizando estándares exigentes, proporcionando una mejor experiencia a los usuarios finales.
          </p>
        </div>
        <div className='photo'>
          {Images.map((obj) => {
            return <img key={obj.id} src={`./img/personal/icons/${obj.src}`} alt={obj.alt}/>
          })}
        </div>
      </div>
      <div>
      </div>
      <BackgroundVideo video='backgroundAboutMe.mp4'/>
    </div>
  )
}

export default Presentation