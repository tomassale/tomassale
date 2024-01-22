import BackgroundVideo from "./background/backgroundVideo"

const Project = () => {
  const projects = [
    {
      title: 'West Drip',
      description: 'Proyecto realizado con ',
      github: 'https://github.com/tomassale/West-Drip',
      link: 'https://github.com/tomassale/West-Drip',
      class: 'flip-card',
      icons: {
        img1: 'mongodb.svg',
        img2: 'j.expressjs_dark.svg',
        img3: 'h.react.svg',
        img4: 'i.nodejs.svg',
        img5: 'n.mysql.png',
        img6: 'f.python.png'
      }
    },
    {
      title: 'Nasa',
      description: 'Adipisicing elit. Repellat voluptatem, voluptatibus cum nesciunt iditate dolor perferendis incidunt officia quos atque beatae! Consectetur vero quia vel repellendus asperiores! Voluptatum.',
      video: './video/projects/soon.mp4',
      github: 'https://github.com/tomassale/Nasa',
      class: 'flip-card',
      icons: {
        img1: 'h.react.svg',
      }
    },
    { 
      title: 'Portfolio',
      description: 'Adipisicing elit. Repellat voluptatem, voluptatibus cum nesciunt iditate dolor perferendis incidunt officia quos atque beatae! Consectetur vero quia vel repellendus asperiores! Voluptatum.',
      github: 'https://github.com/tomassale/Photographer-portfolio',
      url: 'https://github.com/tomassale/Portfolio',
      class: 'flip-card',
      icons: {
        img1: 'h.react.svg',
        img2: 'j.expressjs_dark.svg',
        img3: 'i.nodejs.svg',
        img4: 'n.mysql.png'
      }
    },    
    { 
      title: 'Casona Wine',
      video: './video/project/soon.mp4',
      github: 'https://github.com/tomassale/Casona-Wine',
      class: 'soon'
    },    
    { 
      title: 'Discord clone',
      video: './video/project/soon2.mp4',
      github: 'https://github.com/tomassale/Discord-Clone',
      class: 'soon'
    },
    { 
      title: 'Instagram clone',
      video: './video/project/soon3.mp4',
      github: 'https://github.com/tomassale/Instagram-Clone',
      class: 'soon'
    },
  ]

  return (
    <div className='project' id='portfolio'>
      <h2>Personal projects</h2>
      <div className='gridCard'>
        {projects.map((project, index) => (
          <div key={index} className='flip-card'>
            <div className='flip-card-inner'>
              <div className='flip-card-front'>
                <div className='profileVideo'>
                  <video preload='metadata' autoPlay muted loop disablePictureInPicture>
                    <source  src={project.video} type='video/mp4'/>
                  </video>
                </div>
                <div className='name'>
                  {project.title}
                </div>
                <div className='tech'>
                  {project.icons && Object.keys(project.icons).map((iconKey) => (
                    <img key={iconKey} src={`./img/knowledge/${project.icons[iconKey]}`} alt='technologies' />
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
                      <a id='github' href={project.github} rel='noreferrer' target='_blank'>
                        <img src='./img/icon/github.png' alt='Github'/>
                      </a>
                      {!project.link ? (
                        null
                      ) : (
                        <a id='link' href={project.link} rel='noreferrer' target='_blank'>
                          <img src='./img/icon/url.png' alt='Website'/>
                        </a>
                      )}
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
