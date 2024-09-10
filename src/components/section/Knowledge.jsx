
import React from 'react'
import BackgroundVideo from './background/backgroundVideo'
import Images from '../../data/icons.json'

const Knowledge = () => {

  return (
    <div className='knowledge' id='knowledge'>
      <h2>Tech Stack</h2>
      <div className='imagesKnowledge'>
        {Images.map((imagen, index) => (
          <img key={index} src={imagen.src} alt={imagen.alt}/>
        ))}
      </div>
      <BackgroundVideo video='backgroundKnowledge.mp4'/>
    </div>
  )
}

export default Knowledge