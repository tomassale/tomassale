"use client"
import { Link } from "react-scroll";
import { useSettings } from "../_settings/SettingsProvider";
import { translateNav } from "@/lib/i18n";

interface LinkItem {
  id: number;
  ref: string;
  text: string;
}

interface HeaderItemProps {
  readonly links: LinkItem[];
}

export default function HeaderLinks({ links }: HeaderItemProps) {
  const { lang } = useSettings()
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
          {translateNav(lang, link.ref, link.text)}
        </Link>
      ))}
    </nav>
  );
}