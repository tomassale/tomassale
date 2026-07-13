// SkillList.tsx
import { useMemo, useState } from "react";
import SkillItems from "./SkillItems";
import SkillsSelector from "./SkillsSelector";

interface Item {
  id: number;
  tech: string;
  src: string;
  alt: string;
}

interface SkillListProps {
  readonly itemList: Record<string, Item[]> | null;
}

export default function SkillList({ itemList }: SkillListProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categoriesForSelector = useMemo(() => {
    if (!itemList) return [];
    const names = Object.keys(itemList);
    return names.includes("All") ? names : ["All", ...names];
  }, [itemList]);

  const itemsToRender = useMemo(() => {
    if (!itemList) return [];
    return selectedCategory === "All"
      ? Object.values(itemList).flat()
      : itemList[selectedCategory] || [];
  }, [itemList, selectedCategory]);

  if (!itemList) return null;

  return (
    <div className="skillContainer">
      <SkillsSelector 
        categories={categoriesForSelector} 
        selectedCategory={selectedCategory}
        onSelect={setSelectedCategory} 
      />
      
      <div className="categorySection" key={selectedCategory}>
        <SkillItems items={itemsToRender}/>
      </div>
    </div>
  )
}