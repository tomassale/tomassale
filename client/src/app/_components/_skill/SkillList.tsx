import { useMemo, useState } from "react";
import SkillItems from "./SkillItems";
import SkillsSelector from "./SkillsSelector";
import { useSettings } from "../_settings/SettingsProvider";
import { translateCategory } from "@/lib/i18n";

interface Item {
  id: number;
  tech: string;
  src: string;
  alt: string;
}

interface SkillListProps {
  readonly itemList: Record<string, Item[]> | null;
}

export const ALL_CATEGORIES = "All";

export default function SkillList({ itemList }: SkillListProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(ALL_CATEGORIES);
  const { t, lang } = useSettings();

  const categoriesForSelector = useMemo(() => {
    if (!itemList) return [];
    const names = Object.keys(itemList);
    return names.includes(ALL_CATEGORIES) ? names : [ALL_CATEGORIES, ...names];
  }, [itemList]);

  // Se renderiza el stack completo siempre, con la categoría a cuestas:
  // filtrar atenúa en vez de desmontar, así no hay salto de layout.
  const items = useMemo(() => {
    if (!itemList) return [];
    return Object.entries(itemList).flatMap(([category, list]) =>
      list.map((item) => ({ ...item, category }))
    );
  }, [itemList]);

  if (!itemList) return null;

  return (
    <>
      <SkillsSelector
        categories={categoriesForSelector}
        selectedCategory={selectedCategory}
        onSelect={setSelectedCategory}
      />

      {/* Filtrar atenúa los chips, y eso no llega a quien no ve la pantalla.
          La región vive siempre en el DOM: una que aparece junto con su
          mensaje no se anuncia. */}
      <p className="visually-hidden" role="status">
        {selectedCategory === ALL_CATEGORIES
          ? ''
          : t('showingCategory').replace('{category}', translateCategory(lang, selectedCategory))}
      </p>

      <div className="skillFlow">
        <SkillItems items={items} selectedCategory={selectedCategory}/>
      </div>
    </>
  )
}
