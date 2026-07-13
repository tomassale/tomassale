import Header from './_header/Header'
//import Gif from './Gif/Gif'
import AboutMe from './_aboutMe/AboutMe'
import Skill from './_skill/Skill'
import Project from './_project/Project'
import Contact from './_contact/Contact'
import Footer from './_footer/Footer'

export default function WebDev() {
  return (
    <div className='webDev'>
      <Header/>
      <AboutMe/>
      <Skill/>
      <Project/>
      <Contact/>
      <Footer/>
    </div>
  )
}