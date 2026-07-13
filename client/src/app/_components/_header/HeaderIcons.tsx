"use client"
import Image from 'next/image'
import Link from 'next/link';
import { safeHref } from '@/lib/url';

interface Icons{
  id: number;
  ref: string;
  load?: string;
  src: string;
  alt: string;
}

interface HeaderIcons{
  readonly icons: Icons[]
}

export default function HeaderIcons({icons}: HeaderIcons){
  return(
    <div className='icons'>
      {icons.map((icon) => (
        <Link
          key={icon.id}
          href={safeHref(icon.ref) ?? '#'}
          target='_blank'
          rel='noopener noreferrer'
          draggable='false'
          {...(icon.load ? { download: icon.load } : {})}
        >
          <Image src={icon.src} width={52} height={52} alt={icon.alt}/>
        </Link>
      ))}
    </div>
  )
}