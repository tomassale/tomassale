import Image from 'next/image'
import { logoToneClass } from '@/lib/logoTone'
import { ALL_CATEGORIES } from './SkillList'

interface Item {
  id: number;
  tech: string;
  src: string;
  alt: string;
  category: string;
}

interface SkillItemsProps {
  readonly items: Item[];
  readonly selectedCategory: string;
}

export default function SkillItems({ items, selectedCategory }: SkillItemsProps){
  const isFiltering = selectedCategory !== ALL_CATEGORIES

  return(
    <>
      {items.map((skill) => {
        const dimmed = isFiltering && skill.category !== selectedCategory
        return (
          <span
            className={`skillChip${dimmed ? ' skillChip--dim' : ''}`}
            key={`${skill.category}-${skill.tech}`}
          >
            <Image
              className={logoToneClass(skill.src)}
              src={skill.src}
              alt={skill.alt}
              width={24}
              height={24}
            />
            {skill.tech}
          </span>
        )
      })}
    </>
  )
}
