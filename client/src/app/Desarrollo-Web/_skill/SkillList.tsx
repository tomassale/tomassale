import SkillItems from "./SkillItems";

interface Item {
  id: number;
  tech: string;
  src: string;
  alt: string;
}

interface SkillListProps {
  itemList: Record<string, Item[]> | null;
}

export default function SkillList({ itemList }: SkillListProps) {

  if (!itemList) return null;
  const categoryNames = Object.keys(itemList);

  return (
    <div className="skillContainer">
      {categoryNames.map((name) => (
        <div key={name} className="categorySection">
          <SkillItems items={itemList[name]}/>
        </div>
      ))}
    </div>
  )
}