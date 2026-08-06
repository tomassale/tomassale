"use client"
import { memo } from 'react'
import Image from 'next/image'
import { useSettings } from '../_settings/SettingsProvider'
import { safeHref } from '@/lib/url'

export interface ProjectData {
  _id: string | number;
  img: string;
  title: string;
  description?: string;
  description_en?: string;
  github?: string;
  url?: string;
  link?: string;
  icons: { [key: string]: string };
}

interface ProjectCardProps {
  readonly project: ProjectData
  /**
   * La copia que cierra el bucle se puede clickear igual que la original,
   * pero no se tabula: así no aparece dos veces en el recorrido por
   * teclado ni deja contenido enfocable dentro de un aria-hidden.
   */
  readonly focusable?: boolean
}

function ProjectCard({ project, focusable = true }: ProjectCardProps) {
  const { t, lang } = useSettings()
  const tabIndex = focusable ? undefined : -1
  // Algunos proyectos usan "url" y otros "link" para el sitio en vivo.
  const github = safeHref(project.github)
  const liveUrl = safeHref(project.url ?? project.link)
  const hasLiveUrl = Boolean(liveUrl) && liveUrl !== github
  const description = (lang === 'en' ? project.description_en : project.description) ?? project.description

  return (
    <article className='card'>
      <div className='card__shot'>
        {project.img && (
          <Image
            src={project.img}
            alt={project.title}
            fill
            sizes='340px'
            draggable={false}
          />
        )}
      </div>

      <div className='card__body'>
        <h3 className='card__title'>{project.title}</h3>

        {description && description.trim() !== '.' && (
          <p className='card__description'>{description}</p>
        )}

        <div className='card__tech'>
          {project.icons && Object.keys(project.icons).map((iconKey) => (
            <Image
              key={iconKey}
              src={`/img/skills/${project.icons[iconKey]}`}
              width={20}
              height={20}
              alt=''
              draggable={false}
            />
          ))}
        </div>

        <div className='card__links'>
          {github && (
            <a className='boltLink' href={github} target='_blank' rel='noopener noreferrer' draggable='false' tabIndex={tabIndex}>
              GitHub
            </a>
          )}
          {hasLiveUrl && (
            <a className='boltLink boltLink--solid' href={liveUrl} target='_blank' rel='noopener noreferrer' draggable='false' tabIndex={tabIndex}>
              {t('viewSite')}
            </a>
          )}
        </div>
      </div>
    </article>
  )
}

export default memo(ProjectCard)
