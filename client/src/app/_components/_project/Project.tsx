"use client"
import ProjectList from './ProjectList';
import { ProjectData } from './ProjectCard';
import { useSettings } from '../_settings/SettingsProvider';
import projectData from '../../../../public/data/project.json';

export default function Project() {
  const { t } = useSettings()

  return (
    <section className='panel panel--projects' id='portfolio'>
      <div className='panel__inner'>
        <h2 className='panel__title'>{t('portfolio')}</h2>
      </div>
      <ProjectList cards={projectData as ProjectData[]}/>
    </section>
  )
}
