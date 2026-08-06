import Link from "next/link"

export default function Footer () {
  return(
    <p className='credit'>
      © {new Date().getFullYear()} Tomás Javier Sale · Powered by{' '}
      <Link href='https://bytek-technology.vercel.app' draggable='false' target='_blank' rel='noopener noreferrer'>
        Bytek Technology
      </Link>
    </p>
  )
}
