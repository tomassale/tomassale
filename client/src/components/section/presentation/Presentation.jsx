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
            +3 años de experiencia programando software de calidad implementando tecnologias 
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