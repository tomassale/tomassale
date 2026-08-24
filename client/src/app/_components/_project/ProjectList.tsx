"use client"
import ProjectCard, { ProjectData } from './ProjectCard'
import { useMarquee } from './useMarquee'
import { useSettings } from '../_settings/SettingsProvider'

interface ProjectListProps {
  readonly cards: ProjectData[]
  /** Si la franja está a la vista; fuera de ella el avance se apaga. */
  readonly running: boolean
}

interface CardSetProps {
  readonly cards: ProjectData[]
  readonly focusable: boolean
}

function CardSet({ cards, focusable }: CardSetProps) {
  return (
    // role='list' explícito: el reset global aplica list-style: none a todo,
    // y con eso Safari deja de anunciarla como lista.
    <ul className='cardSet' role='list'>
      {cards.map((project) => (
        <li key={project._id}>
          <ProjectCard project={project} focusable={focusable}/>
        </li>
      ))}
    </ul>
  )
}

export default function ProjectList({ cards, running }: ProjectListProps) {
  const { t } = useSettings()
  const { trackRef, handlers } = useMarquee(running)

  if (cards.length === 0) {
    return <p className='card__description'>{t('loadingProjects')}</p>
  }

  return (
    <div className='marquee' {...handlers}>
      <div className='marquee__track' ref={trackRef}>
        <CardSet cards={cards} focusable/>
        {/* Copia que cierra el bucle: se ve y se clickea igual, pero no se
            anuncia ni se tabula por duplicado. */}
        <div aria-hidden='true'>
          <CardSet cards={cards} focusable={false}/>
        </div>
      </div>
    </div>
  )
}
