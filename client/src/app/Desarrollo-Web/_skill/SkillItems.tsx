import Image from 'next/image'

interface Items{
  id: number;
  tech: string;
  src: string;
  alt: string;
}

interface HeaderProps{
  readonly items: Items[];
}

export default function SkillItems({items}: HeaderProps){
  return(
    <>
      {items.map((skill:Items, index: number) => (
        <div className='imageContainer' key={`${skill.tech}-${index}`}>
          <Image 
            src={skill.src}
            alt={skill.alt}
            width={50}
            height={50}
          />
          <p>{skill.tech}</p>
        </div>
      ))}
    </>
  )
}