const Presentation = () => {
  return (
    <div className='presentation' id='aboutMe'>
      <div className='description'>
        <h2>Tomás Javier Sale</h2>
        <h4>Desarrollador Web</h4>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit quam
          eaque omnis iusto asperiores? Suscipit quas iusto maiores quisquam sit
          non, atque neque molestias nostrum vitae ad impedit earum ratione.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit quam
          eaque omnis iusto asperiores? Suscipit quas iusto maiores quisquam sit
          non, atque neque molestias nostrum vitae ad impedit earum ratione.Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit quam
          eaque omnis iusto asperiores? Suscipit quas iusto.
        </p>
      </div>
      <div className='photo'>
        <img src='./img/personal/FotoCV.png' alt='foto de perfil'/>
      </div>
      <div className='backgroundVideo'>
        <video src="./video/background/backgroundAboutMe.mp4" preload autoPlay muted loop disablePictureInPicture/>
      </div>
    </div>
  )
}

export default Presentation