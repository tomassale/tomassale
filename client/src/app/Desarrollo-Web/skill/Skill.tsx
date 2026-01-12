"use client"

import Image from "next/image"
import { useState, useEffect } from "react"

export default function Skill () {

  const [data, setData] = useState([])

  useEffect(() => {
    fetch('/data/skills.json')
      .then(res => res.json())
      .then(res => setData(res))
      .catch(err => console.error(err))
  }, [])

  return(
    <div className='skill' id='skill'>
      <h2>Skills</h2>
      <div className='skills'>
        {data.map((skill)=>{
          <div>
            <Image 
              key={skill._id}
              src={skill.img}
              alt={skill.alt}
              
            />
          </div>
        })}
      </div>
    </div>
  )
}

/*
const Skill = () => {
  return (
    <div className='skill' id='skill'>
      <h2>Skills</h2>
      <div className='cards'>
        {Cards.map((obj, index)=>{
          return(
            <div className={`card`} key={obj.id}>
              <div className='imageTitle'>
                <img src={obj.image} alt={obj.title}/>
                <h3>{obj.title}</h3>
              </div>
              <div className='description'>
                <p>{obj.description}</p>
              </div>
            </div>
          )
        })}
      </div>
      <BackgroundVideo video='backgroundKnowledge.mp4'/>
    </div>
  )
}
*/