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

  if (!itemList) return null;
  const categoryNames = Object.keys(itemList);

  return (
    <div className="skillContainer">
      <SkillsSelector/>
      {categoryNames.map((name) => (
        <div key={name} className="categorySection">
          <SkillItems items={itemList[name]}/>
        </div>
      ))}
    </div>
  )
}