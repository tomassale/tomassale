"use client"
import { Link } from "react-scroll";

interface LinkItem {
  id: number;
  ref: string;
  text: string;
}

interface HeaderItemProps {
  readonly links: LinkItem[];
}

export default function HeaderLinks({ links }: HeaderItemProps) {
  return (
    <nav className='barra'>
      {links.map((link) => (
        <Link
          key={link.id}
          to={link.ref}
          smooth={true}
          duration={500}
          offset={-40}
          draggable='false'
        >
          {link.text}
        </Link>
      ))}
    </nav>
  );
}