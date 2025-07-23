import NavBar from './components/header/NavBar'
import Presentation from './components/section/presentation/Presentation'
import Skill from './components/section/skill/Skill'
import Project from './components/section/project/Project'
import Contact from './components/section/contact/Contact'
import Footer from './components/footer/Footer'

const App = () => {
  return (
    <>
      <NavBar/>
      <Presentation/>
      <Skill/>
      <Project/>
      <Contact/>
      <Footer/>
    </>
  )
}

export default App