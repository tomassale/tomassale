"use client"
import HeaderLinks from "./HeaderLinks"
import HeaderActions from './HeaderActions'
import SettingsControls from '../_settings/SettingsControls'
import { useDeck } from '../_deck/DeckContext'
import headerData from '../../../../public/data/header.json'

export default function Header() {
  const { icons } = headerData;
  const { panels, goTo } = useDeck()

  return (
    <header className='navbar'>
      <button className='logo' onClick={() => goTo(panels[0].id)}>
        <span aria-hidden='true'>&lt;</span>Tomás<span aria-hidden='true'>/&gt;</span>
      </button>
      <HeaderLinks/>
      <div className='navActions'>
        <HeaderActions actions={icons}/>
        <SettingsControls/>
      </div>
    </header>
  )
}
