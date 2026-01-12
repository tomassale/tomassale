"use client"
import Image from 'next/image'
import Link from 'next/link';

interface Icons{
  id: number;
  ref: string;
  load?: string;
  src: string;
  alt: string;
}

interface HeaderIcons{
  icons: Icons[]
}

export default function HeaderIcons({icons}: HeaderIcons){
  return(
    <div className='icons'>
      {icons.map((icon) => (
        <Link
          key={icon.id}
          href={icon.ref} 
          target='_blank' 
          rel='noopener noreferrer' 
          {...(icon.load ? { download: icon.load } : {})}
        >
            <Image src={icon.src} width={200} height={200} alt={icon.alt}/>
        </Link>
      ))}
    </div>
  )
}