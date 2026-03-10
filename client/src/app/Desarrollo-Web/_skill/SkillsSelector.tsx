// SkillsSelector.tsx
interface SkillsSelectorProps {
  categories: string[];
  selectedCategory: string;
  onSelect: (category: string) => void;
}

export default function SkillsSelector({ categories, selectedCategory, onSelect }: Readonly<SkillsSelectorProps>) {
  return (
    <div className='skillsSelector'>
      <button 
        onClick={() => onSelect('All')}
        className={selectedCategory === 'All' ? 'active' : ''}
      >
        Todos
      </button>

      {categories.map((category) => (
        <button 
          key={category} 
          onClick={() => onSelect(category)}
          className={selectedCategory === category ? 'active' : ''}
        >
          {category}
        </button>
      ))}
    </div>
  )
}