import BackgroundVideo from "./background/backgroundVideo"

const Presentation = () => {
  return (
    <div className='aboutMe' id='aboutMe'>
      <div className='presentation'>
        <div className='description'>
          <h2>Tomás Javier Sale</h2>
          <h4>Web Developer</h4>
          <p>
            +3 years experience
          </p>
        </div>
        <div className='photo'>
          <img src='./img/personal/FotoCV.png' alt='Profile'/>
        </div>
      </div>
      <div>
      </div>
      <BackgroundVideo video='backgroundAboutMe.mp4'/>
    </div>
  )
}

export default Presentation