const Project = () => {
  const projects = [
    {
      title: 'West Drip',
      video: './video/projects/',
      description: 'Proyecto realizado con React \n-Python\n-React Js\n-MongoDB\n-SQL',
      github: 'https://github.com/tomassale/West-Drip',
      class: 'flip-card',
      icons: {
        github: './img/icon/d.github.png'
      }
    },
    {
      title: 'Nasa',
      description: 'P',
      video: './video/projects/',
      github: 'https://github.com/tomassale/Nasa',
      class: 'flip-card'
    },
    { 
      title: 'Portfolio',
      description: '',
      video: './video/projects/',
      github: 'https://github.com/tomassale/Nasa',
      class: 'flip-card'
    },    
    { 
      title: 'Casona Wine',
      description: 'P',
      github: 'https://github.com/tomassale/Nasa',
      class: 'soon'
    },    
    { 
      title: 'Instagram clone',
      description: 'P',
      github: 'https://github.com/tomassale/Nasa',
      class: 'soon'
    },
    { 
      title: 'Discord clone',
      description: 'P',
      github: 'https://github.com/tomassale/Nasa',
      class: 'soon'
    }
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
                  <video/>
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
