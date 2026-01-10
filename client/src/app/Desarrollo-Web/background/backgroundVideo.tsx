export default function BackgroundVideo (video: string) {
  return (
    <div className='backgroundVideo'>
      <video preload='metadata' autoPlay muted loop disablePictureInPicture>
        <source src={`./video/background/${video}`} type='video/webm'/>
      </video>
    </div>
  )
}