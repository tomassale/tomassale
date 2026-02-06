"use client"
import HeaderLinks from "./HeaderLinks"
import HeaderIcons from './HeaderIcons'
import { Link } from "react-scroll"
import { useEffect, useState } from 'react'

export default function Header() {

  const [headerData, setHeaderData] = useState({ links: [], icons: []})

  useEffect(()=> {
    fetch('/data/header.json')
      .then(res => res.json())
      .then(data => setHeaderData(data))
      .catch(err => 
        console.error("Error cargando el header: ", err)
      )
  }, [])

  const { links, icons } = headerData;

  return (
    <header className='navbar'>
      <Link className='logo' to='aboutMe' draggable='false'>
        {'<TOMAS/>'}
      </Link>
      <HeaderLinks links={links}/>
      <HeaderIcons icons={icons}/>
    </header>
  )
}