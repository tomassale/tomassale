import BackgroundVideo from '../background/backgroundVideo'

const Skill = () => {
  return(
    <div className='skill' id='skill'>
      <h2>Skills</h2>
      <div className='skills'>
        {}
      </div>
      <BackgroundVideo video='backgroundKnowledge.mp4'/>
    </div>
  )
}

export default Skill

/*
const Skill = () => {
  return (
    <div className='skill' id='skill'>
      <h2>Skills</h2>
      <div className='cards'>
        {Cards.map((obj, index)=>{
          return(
            <div className={`card`} key={obj.id}>
              <div className='imageTitle'>
                <img src={obj.image} alt={obj.title}/>
                <h3>{obj.title}</h3>
              </div>
              <div className='description'>
                <p>{obj.description}</p>
              </div>
            </div>
          )
        })}
      </div>
      <BackgroundVideo video='backgroundKnowledge.mp4'/>
    </div>
  )
}
*/