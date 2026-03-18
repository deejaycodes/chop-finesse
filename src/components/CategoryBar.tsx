import { useRef, useEffect } from "react";
import { categories } from "@/data/menu";

interface CategoryBarProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryBar = ({ activeCategory, onCategoryChange }: CategoryBarProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const activeEl = scrollRef.current?.querySelector(`[data-category="${activeCategory}"]`);
    activeEl?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [activeCategory]);

  return (
    <div className="sticky top-0 z-20 bg-background border-b border-border shadow-sm">
      <div ref={scrollRef} className="flex gap-1 overflow-x-auto px-3 py-2 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat}
            data-category={cat}
            onClick={() => onCategoryChange(cat)}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold font-body transition-colors ${
              activeCategory === cat
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-border"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryBar;
