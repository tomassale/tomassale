const Project = () => {
  const projects = [
    {
      title: 'West Drip',
      description: 'Proyecto realizado con React-Python-MongoDB-SQL',
      github: 'https://github.com/tomassale/West-Drip',
      class: 'flip-card',
      icons: {
        github: './img/icon/d.github.png'
      }
    },
    {
      title: 'Nasa',
      description: 'P',
      video: './video/projects/soon.mp4',
      github: 'https://github.com/tomassale/Nasa',
      class: 'flip-card'
    },
    { 
      title: 'Portfolio',
      description: '',
      github: 'https://github.com/tomassale/Portfolio',
      class: 'flip-card'
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
                  <video src={project.video} autoPlay muted loop disablePictureInPicture/>
                </div>
                <div className='name'>
                  {project.title}
                </div>
                <div className='tech'>
                  <img src="" alt="Icono" />
                  {/*{project.icons.map((element, index) => (
                    <img key={index} src={element.value} alt={element.key}/>
                  ))} */}
                </div>
              </div>
              {project.class === 'soon' ? (
                null
              ) : (
                <div className='flip-card-back'>
                  <div className='Description'>
                    <p className='description'>
                      {project.description}
                    </p>
                    <div className='socialBar'>
                      <a id='github' href={project.github}>
                        <img src='./img/icon/d.github.png' alt="" />
                      </a>
                      <a id='link' href='https://github.com/tomassale'>
                        <img src='./img/icon/d.github.png' alt='Website'/>
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className='backgroundVideo'>
        <video src="./video/background/backgroundProject.mp4" autoPlay muted loop disablePictureInPicture/>
      </div>
    </div>
  );
}

export default Project;
