"use client"
import HeaderLinks from "./HeaderLinks"
import HeaderIcons from './HeaderIcons'
import SettingsControls from '../_settings/SettingsControls'
import { Link } from "react-scroll"
import headerData from '../../../../public/data/header.json'

export default function Header() {
  const { links, icons } = headerData;

  return (
    <header className='navbar'>
      <Link className='logo' to='aboutMe' draggable='false'>
        {'<TOMAS/>'}
      </Link>
      <SettingsControls/>
      <HeaderLinks links={links}/>
      <HeaderIcons icons={icons}/>
    </header>
  )
}