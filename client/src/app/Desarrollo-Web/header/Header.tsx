"use client"
import HeaderLinks from "./HeaderLinks"
import HeaderIcons from './HeaderIcons'
import { Link } from "react-scroll"

export default function Header() {

  const links = [
    {id: 0, ref: 'aboutMe', text: 'ABOUT ME'},
    {id: 1, ref: 'skill', text: 'SKILLS'},
    {id: 2, ref: 'portfolio', text: 'PORTFOLIO'},
    {id: 3, ref: 'contact', text: 'CONTACT ME'}
  ]
  const icons = [
    {id: 0, ref: 'https://www.linkedin.com/in/tomás-sale-147077226/', src: '/img/icons/linkedin.png', alt: 'linkedin'},
    {id: 1, ref: 'https://github.com/tomassale', src: '/img/icons/github.png', alt: 'github'},
    {id: 2, ref: './img/personal/Tomás Javier Sale.pdf', src: '/img/icons/cv.png', alt: 'curriculum', load: 'Tomás Sale.pdf'}
  ]

  return (
    <header className='navbar'>
      <Link className='logo' to='aboutMe'>
        {'<TOMAS/>'}
      </Link>
      <HeaderLinks links={links}/>
      <HeaderIcons icons={icons}/>
    </header>
  )
}