"use client"
import { useMemo } from 'react'
import Header from './_components/_header/Header'
import AboutMe from './_components/_aboutMe/AboutMe'
import Skill from './_components/_skill/Skill'
import Project from './_components/_project/Project'
import Contact from './_components/_contact/Contact'
import Footer from './_components/_footer/Footer'
import { DeckProvider, DeckViewport } from './_components/_deck/Deck'
import DeckRail from './_components/_deck/DeckRail'
import { useSettings } from './_components/_settings/SettingsProvider'
import { translateNav } from '@/lib/i18n'
import headerData from '../../public/data/header.json'

export default function WebDev() {
  const { lang } = useSettings()

  const panels = useMemo(
    () => headerData.links.map((link) => ({
      id: link.ref,
      label: translateNav(lang, link.ref, link.text),
    })),
    [lang]
  )

  return (
    <DeckProvider panels={panels}>
      <Header/>
      <DeckViewport>
        <AboutMe/>
        <Skill/>
        <Project/>
        <Contact/>
      </DeckViewport>
      <div className='deckBar'>
        <DeckRail/>
        <Footer/>
      </div>
    </DeckProvider>
  )
}
