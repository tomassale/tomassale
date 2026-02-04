"use client"

import { useState, useEffect } from "react"
import SkillList from "./SkillList"

export default function Skill() {
  const [data, setData] = useState(null) 

  useEffect(() => {
    fetch('/data/skills.json')
      .then(res => res.json())
      .then(res => setData(res))
      .catch(err => console.error(err))
  }, [])

  return (
    <div className='skill' id='skill'>
      <h2>Skills</h2>
      <SkillList itemList={data}/>
    </div>
  )
}
