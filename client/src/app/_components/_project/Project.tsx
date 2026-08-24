"use client"
import ProjectList from './ProjectList';
import { ProjectData } from './ProjectCard';
import { useSettings } from '../_settings/SettingsProvider';
import { useDeck } from '../_deck/DeckContext';
import projectData from '../../../../public/data/project.json';

const PANEL_ID = 'portfolio'

export default function Project() {
  const { t } = useSettings()
  // El recorrido publica el panel a la vista y solo cambia al dar un paso,
  // así que leerlo acá no cuesta un render por cuadro de scroll.
  const { activeId } = useDeck()

  return (
    <section className='panel panel--projects' id={PANEL_ID}>
      <div className='panel__inner'>
        <h2 className='panel__title'>{t('portfolio')}</h2>
      </div>
      <ProjectList cards={projectData as ProjectData[]} running={activeId === PANEL_ID}/>
    </section>
  )
}
