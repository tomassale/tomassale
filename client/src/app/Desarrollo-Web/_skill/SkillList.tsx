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
  readonly itemList: Record<string, Item[]> | null;
}

export default function SkillList({ itemList }: SkillListProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  if (!itemList) return null;
  
  const categoryNames = Object.keys(itemList);
  
  // Agregamos "All" a los botones del selector por si no viene en tu JSON
  const categoriesForSelector = categoryNames.includes("All") 
    ? categoryNames 
    : ["All", ...categoryNames];

  // MAGIA AQUÍ: Si es "All", usamos .flat() para juntar todos los arrays en una sola lista. 
  // Si es otra categoría, solo mostramos el array de esa categoría.
  const itemsToRender = selectedCategory === "All" 
    ? Object.values(itemList).flat() 
    : itemList[selectedCategory] || [];

  return (
    <div className="skillContainer">
      <SkillsSelector 
        categories={categoriesForSelector} 
        selectedCategory={selectedCategory}
        onSelect={setSelectedCategory} 
      />
      
      {/* Ahora usamos un ÚNICO contenedor, lo que permite que el Grid funcione perfecto */}
      <div className="categorySection">
        <SkillItems items={itemsToRender}/>
      </div>
    </div>
  )
}