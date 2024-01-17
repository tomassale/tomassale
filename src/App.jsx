import NavBar from './components/header/NavBar'
import Presentation from './components/section/Presentation'
import Knowledge from './components/section/Knowledge'
import Project from './components/section/Project'
import Contact from './components/section/Contact'
import Footer from './components/footer/Footer'

const App = () => {
  return (
    <>
      <NavBar />
      <Presentation />
      <hr/>
      <Knowledge />
      <hr/>
      <Project />
      <hr/>
      <Contact />
      <Footer />
    </>
  )
}

export default App