const BackgroundVideo = ({video}) => {
  return (
    <div className='backgroundVideo'>
      <video preload='metadata' autoPlay muted loop disablePictureInPicture>
        <source src={`./video/background/${video}`} type='video/mp4'/>
      </video>
    </div>
  )
}

export default BackgroundVideo