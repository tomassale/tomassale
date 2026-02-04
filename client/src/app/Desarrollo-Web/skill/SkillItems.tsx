import Image from 'next/image'
import Text from 'next/text'

interface Items{
  id: number;
  tech: string;
  src: string;
  alt: string;
}

interface HeaderProps{
  items: Items[];
}

export default function SkillItems({items}: HeaderProps){
  return(
    <>
      {items.map((skill:Items) => (
        <div className='imageContainer' key={skill.id}>
          <Image 
            src={skill.src}
            alt={skill.alt}
            width={50}
            height={50}
          />
          <Text>{skill.tech}</Text>
        </div>
      ))}
    </>
  )
}