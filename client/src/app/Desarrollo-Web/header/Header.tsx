export default function Header() {
  return (
    <header className='navbar'>
      <a className='logo' href='#aboutMe'>
        {'<TOMAS/>'}
      </a>
      <nav className='barra'>
        <a href='#aboutMe'>ABOUT ME</a>
        <a href='#skill'>SKILLS</a>
        <a href='#portfolio'>PORTFOLIO</a>
        <a href='#contact'>CONTACT ME</a>
      </nav>
      <div className='icons'>
        <a href='https://www.linkedin.com/in/tomás-sale-147077226/' target='_blank' rel='noopener noreferrer'>
          <img src='./img/icons/linkedin.png' alt='linkedin'/>
        </a>
        <a href='https://github.com/tomassale' target='_blank' rel='noopener noreferrer'>
          <img src='./img/icons/github.png' alt='github'/>
        </a>
        <a href='./img/personal/Tomás Javier Sale.pdf' download='Tomás Sale.pdf'>
          <img src='./img/icons/cv.png' alt='curriculum' />
        </a>
      </div>
    </header>
  )
}