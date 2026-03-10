// SkillList.tsx
import { useState } from "react";
import SkillItems from "./SkillItems";
import SkillsSelector from "./SkillsSelector";

interface Item {
  id: number;
  tech: string;
  src: string;
  alt: string;
}

interface SkillListProps {
  itemList: Record<string, Item[]> | null;
}

export default function SkillList({ itemList }: Readonly<SkillListProps>) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  if (!itemList) return null;
  
  const categoryNames = Object.keys(itemList);
  const categoriesToShow = selectedCategory === "All" 
    ? categoryNames 
    : [selectedCategory];

  return (
    <div className="skillContainer">
      <SkillsSelector 
        categories={categoryNames} 
        selectedCategory={selectedCategory}
        onSelect={setSelectedCategory} 
      />
      
      {categoriesToShow.map((name) => (
        <div key={name} className="categorySection">
          <SkillItems items={itemList[name]}/>
        </div>
      ))}
    </div>
  )
}