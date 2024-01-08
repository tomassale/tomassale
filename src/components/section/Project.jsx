const Project = () => {
  const projects = [
    {
      title: 'West Drip',
      description: 'Proyecto realizado con React \n-Python\n-React Js\n-MongoDB\n-SQL',
      github: 'https://github.com/tomassale/West-Drip',
      class: 'flip-card-active'
    },
    {
      title: 'Nasa',
      description: 'P',
      github: 'https://github.com/tomassale/Nasa',
      class: 'flip-card-soon'
    },
    { 
      title: 'Nasa',
      description: 'P',
      github: 'https://github.com/tomassale/Nasa',
      class: 'flip-card-soon'
    },    
    { 
      title: 'Nasa',
      description: 'P',
      github: 'https://github.com/tomassale/Nasa',
      class: 'flip-card-soon'
    },    
    { 
      title: 'Nasa',
      description: 'P',
      github: 'https://github.com/tomassale/Nasa',
      class: 'flip-card-soon'
    },
    { 
      title: 'Nasa',
      description: 'P',
      github: 'https://github.com/tomassale/Nasa',
      class: 'flip-card-soon'
    },
    { 
      title: 'Nasa',
      description: 'P',
      github: 'https://github.com/tomassale/Nasa',
      class: 'flip-card-soon'
    },
    { 
      title: 'Nasa',
      description: 'P',
      github: 'https://github.com/tomassale/Nasa',
      class: 'flip-card-soon'
    },
    { 
      title: 'Nasa',
      description: 'P',
      github: 'https://github.com/tomassale/Nasa',
      class: 'flip-card-soon'
    },
        { 
      title: 'Nasa',
      description: 'P',
      github: 'https://github.com/tomassale/Nasa',
      class: 'flip-card-soon'
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
                  <img alt='Video'/>
                </div>
                <div className='name'>
                  {project.title}
                </div>
                <div className='tech'>
                  <img src='' alt='icono'/>
                </div>
              </div>
              <div className='flip-card-back'>
                <div className='description'>
                  <p>
                    {project.description}
                  </p>
                </div>
                <div className='socialBar'>
                  <a id='github' href={project.github}><img src='./img/icon/d.github.png' alt="" /></a>
                  <a id='link' href='https://github.com/tomassale'><img src='./img/icon/d.github.png' alt='Website'/></a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Project;
