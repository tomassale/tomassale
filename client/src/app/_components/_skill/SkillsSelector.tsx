// SkillsSelector.tsx
import { useSettings } from "../_settings/SettingsProvider"
import { translateCategory } from "@/lib/i18n"

interface SkillsSelectorProps {
  categories: string[];
  selectedCategory: string;
  onSelect: (category: string) => void;
}

export default function SkillsSelector({ categories, selectedCategory, onSelect }: Readonly<SkillsSelectorProps>) {
  const { lang } = useSettings()
  return (
    <div className='skillsSelector'>
      {categories.map((category) => (
        // aria-pressed y no solo la clase: una clase de CSS no llega al
        // lector de pantalla, y sin esto los seis botones se anuncian iguales.
        <button
          key={category}
          type='button'
          onClick={() => onSelect(category)}
          aria-pressed={selectedCategory === category}
          className={selectedCategory === category ? 'active' : ''}
        >
          {translateCategory(lang, category)}
        </button>
      ))}
    </div>
  )
}