import { useEffect, useState } from 'react'

export default function SkillsSelector() {

  const [data, setData] = useState([])

  useEffect(() => {
    fetch('/data/skills.json')
      .then(res => res.json())
      .then(res => setData(res))
      .catch(err => console.error(err));
  }, [])

  return (
    <div className='skillsSelector'>
      {Object.keys(data).map((category)=>(
        <button key={category}>{category}</button>
      ))}
    </div>
  )
}