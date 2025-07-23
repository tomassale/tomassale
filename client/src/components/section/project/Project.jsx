import BackgroundVideo from '../background/backgroundVideo'
import data from '../../../data/project.json'

const Project = () => {
  return (
    <div className='project' id='portfolio'>
      <h2>Personal projects</h2>
      <div className='gridCard'>
        {data.map((project) => (
          <div key={project._id} className='flip-card'>
            <div className='flip-card-inner'>
              <div className='flip-card-front'>
                {project.video?(
                  <div className='profileMedia'>
                    <video preload='metadata' autoPlay muted loop disablePictureInPicture>
                      <source src={project.video} type='video/mp4'/>
                    </video>
                  </div>
                ):(
                  <div className='profileMedia'>
                    <img src={project.img} alt='img' />
                  </div>
                )}
                <div className='name'>
                  {project.title}
                </div>
                <div className='tech'>
                  {project.icons && Object.keys(project.icons).map((iconKey) => (
                    <img key={iconKey} src={`./img/personal/icons/${project.icons[iconKey]}`} alt='technologies' />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <BackgroundVideo video='backgroundProject.mp4'/>
    </div>
  )
}

export default Project