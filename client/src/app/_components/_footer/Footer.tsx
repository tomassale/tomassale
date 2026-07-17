import Link from "next/link"

export default function Footer () {
  return(
    <footer className='footer'>
      <hr/>
      <h5>Powered by <Link href='https://bytek-technology.vercel.app' draggable='false' target='_blank' rel='noopener noreferrer'>Bytek Technology</Link></h5>
    </footer>
  )
}