import { NavLink } from "react-router-dom"

const NavBar = () =>{
  const yo = '<TOMAS/>'

  return (
    <header className='navbar'>
      <a className='logo' href='#About-Me'>{yo}</a>
      <nav className='barra'>
        <a src='#About-Me'>ABOUT ME</a>
        <a src='/#Porfolio'>PORTFOLIO</a>
        <a src='/Tools'>TOOLS</a>
        <a src='/Contact-me'>CONTACT ME</a>
      </nav>
    </header>
  )
}

export default NavBar