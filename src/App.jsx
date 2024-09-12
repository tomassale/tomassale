import NavBar from './components/header/NavBar'
import Presentation from './components/section/Presentation'
import Skill from './components/section/Skill'
import Project from './components/section/Project'
import Contact from './components/section/Contact'
import Footer from './components/footer/Footer'

const App = () => {
  return (
    <>
      <NavBar />
      <Presentation />
      <hr/>
      <Skill />
      <hr/>
      <Project />
      <hr/>
      <Contact />
      <Footer />
    </>
  )
}

export default App