"use client"
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import ProjectSwiper from './ProjectSwiper';
import { ProjectData } from './ProjectCard';
import { useSettings } from '../_settings/SettingsProvider';
import projectData from '../../../../public/data/project.json';

export default function Project() {
  const { t } = useSettings()

  return (
    <div className='project' id='portfolio'>
      <h2>{t('portfolio')}</h2>
      <ProjectSwiper cards={projectData as ProjectData[]}/>
    </div>
  )
}