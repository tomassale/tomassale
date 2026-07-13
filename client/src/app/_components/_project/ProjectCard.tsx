"use client"
import { memo } from 'react'
import Image from 'next/image'
import { useSettings } from '../_settings/SettingsProvider'
import { safeHref } from '@/lib/url'

export interface ProjectData { // Exportamos la interfaz para usarla en el Swiper
  _id: string | number;
  img: string;
  title: string;
  description?: string;
  github?: string;
  url?: string;
  link?: string;
  icons: { [key: string]: string };
}

function ProjectCard({ project }: Readonly<{ project: ProjectData }>) {
  const { t } = useSettings()
  // Algunos proyectos usan "url" y otros "link" para el sitio en vivo.
  const github = safeHref(project.github)
  const liveUrl = safeHref(project.url ?? project.link)
  const hasLiveUrl = Boolean(liveUrl) && liveUrl !== github

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

      <div className='flip-card-back'>
        <h3 className='back-title'>{project.title}</h3>
        {project.description && project.description.trim() !== '.' && (
          <p className='back-description'>{project.description}</p>
        )}
        <div className='back-links'>
          {github && (
            <a href={github} target='_blank' rel='noopener noreferrer' draggable='false'>
              GitHub
            </a>
          )}
          {hasLiveUrl && (
            <a href={liveUrl} target='_blank' rel='noopener noreferrer' draggable='false'>
              {t('viewSite')}
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default memo(ProjectCard)
