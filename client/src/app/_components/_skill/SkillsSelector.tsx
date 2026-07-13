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
        <button
          key={category}
          onClick={() => onSelect(category)}
          className={selectedCategory === category ? 'active' : ''}
        >
          {translateCategory(lang, category)}
        </button>
      ))}
    </div>
  )
}