import Header from './_components/_header/Header'
//import Gif from './Gif/Gif'
import AboutMe from './_components/_aboutMe/AboutMe'
import Skill from './_components/_skill/Skill'
import Project from './_components/_project/Project'
import Contact from './_components/_contact/Contact'
import Footer from './_components/_footer/Footer'
import Reveal from './_components/_shared/Reveal'

export default function WebDev() {
  return (
    <div className='webDev'>
      <Header/>
      <AboutMe/>
      <Reveal animation="left"><Skill/></Reveal>
      <Reveal animation="zoom"><Project/></Reveal>
      <Reveal animation="right"><Contact/></Reveal>
      <Reveal animation="up"><Footer/></Reveal>
    </div>
  )
}