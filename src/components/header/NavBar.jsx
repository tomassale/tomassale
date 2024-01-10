const NavBar = () =>{
  const yo = '<TOMAS/>'

  return (
    <header className='navbar'>
      <a className='logo' href='#aboutMe'>{yo}</a>
      <nav className='barra'>
        <a href='#aboutMe'>ABOUT ME</a>
        <a href='#knowledge'>TOOLS</a>
        <a href='#portfolio'>PORTFOLIO</a>
        <a href='#contact'>CONTACT ME</a>
      </nav>
    </header>
  )
}

export default NavBar