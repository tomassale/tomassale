import Link from "next/link"

export default function Footer () {
  return(
    <footer className='footer'>
      <hr/>
      <h5>Powered by <Link href='https://github.com/tomassale' draggable='false' target='blank'>Tomás Sale</Link></h5>
    </footer>
  )
}