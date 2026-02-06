import Image from 'next/image'

export interface ProjectData { // Exportamos la interfaz para usarla en el Swiper
  _id: string;
  img: string;
  title: string;
  icons: { [key: string]: string };
}

export default function ProjectCard({ project }: Readonly<{ project: ProjectData }>) {
  return (
    <div className='flip-card-inner'>
      <div className='flip-card-front'>
        <div className='profileMedia'>
          {project.img && (
            <Image 
              src={project.img} 
              alt={project.title} 
              fill 
              sizes="(max-width: 768px) 100vw, 350px"
            />
          )}
        </div>
        <div className='name'>{project.title}</div>
        <div className='tech'>
          {project.icons && Object.keys(project.icons).map((iconKey) => (
            <Image 
              key={iconKey} 
              src={`/img/skills/${project.icons[iconKey]}`} 
              width={35} 
              height={35} 
              alt='tech' 
            />
          ))}
        </div>
      </div>
    </div>
  )
}