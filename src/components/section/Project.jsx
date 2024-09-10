import BackgroundVideo from './background/backgroundVideo'
import Info from '../../data/project.json'

const Project = () => {

  return (
    <div className='project' id='portfolio'>
      <h2>Personal projects</h2>
      <div className='gridCard'>
        {Info.map((project, index) => (
          <div key={index} className='flip-card'>
            <div className='flip-card-inner'>
              <div className='flip-card-front'>
                <div className='profileVideo'>
                  <video preload='metadata' autoPlay muted loop disablePictureInPicture>
                    <source src={project.video} type='video/mp4'/>
                  </video>
                </div>
                <div className='name'>
                  {project.title}
                </div>
                <div className='tech'>
                  {project.icons && Object.keys(project.icons).map((iconKey) => (
                    <img key={iconKey} src={`./img/personal/icons/${project.icons[iconKey]}`} alt='technologies' />
                  ))}
                </div>
              </div>
              {project.class === 'soon' ? (
                null
              ) : (
                <div className='flip-card-back'>
                  <div className='description'>
                    <p className='text'>
                      {project.description}
                    </p>
                    <div className='page'>
                      {!project.link ? (
                        null
                      ) : (
                        <a id='link' href={project.link} rel='noreferrer' target='_blank'>
                          <img src='./img/icon/url.png' alt='Website'/>
                        </a>
                      )}
                      <a id='github' href={project.github} rel='noreferrer' target='_blank'>
                        <img src='./img/icon/github.png' alt='Github'/>
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <BackgroundVideo video='backgroundProject.mp4'/>
    </div>
  )
}

export default Project