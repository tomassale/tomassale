import Header from './header/Header'
import AboutMe from './aboutMe/AboutMe'
import Skill from './skill/Skill'
import Project from './project/Project'
import Contact from './contact/Contact'
import Footer from './footer/Footer'

export default function DataAnalyst() {
  return (
    <div className='dataAnalyst'>
      <Header/>
      <AboutMe/>
      <Skill/>
      <Project/>
      <Contact/>
      <Footer/>
    </div>
  )
}