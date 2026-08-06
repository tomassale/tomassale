"use client"
import SkillList from "./SkillList"
import { useSettings } from "../_settings/SettingsProvider"
import skillsData from "../../../../public/data/skills.json"

export default function Skill() {
  const { t } = useSettings()

  return (
    <section className='panel' id='skill'>
      <div className='panel__inner'>
        <h2 className='panel__title'>{t('skills')}</h2>
        <SkillList itemList={skillsData}/>
      </div>
    </section>
  )
}
