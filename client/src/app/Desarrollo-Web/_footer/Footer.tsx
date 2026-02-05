import Link from "next/link"

export default function Footer () {
  return(
    <footer className='footer'>
      <hr/>
      <h5>Powered by <Link href='https://github.com/BytekTech' draggable='false' target='blank'>Bytek Technology</Link></h5>
    </footer>
  )
}