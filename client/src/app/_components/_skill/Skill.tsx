"use client"
import SkillList from "./SkillList"
import { useSettings } from "../_settings/SettingsProvider"
import skillsData from "../../../../public/data/skills.json"

export default function Skill() {
  const { t } = useSettings()

  return (
    <div className='skill' id='skill'>
      <h2>{t('skills')}</h2>
      <SkillList itemList={skillsData}/>
    </div>
  )
}