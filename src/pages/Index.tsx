import { useState, useCallback, useRef, useEffect } from "react";
import MenuHeader from "@/components/MenuHeader";
import CategoryBar from "@/components/CategoryBar";
import MenuItemCard from "@/components/MenuItemCard";
import CartFAB from "@/components/CartFAB";
import { categories, menuItems } from "@/data/menu";

const Index = () => {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [cart, setCart] = useState<Record<string, number>>({});
  const [cartAnimate, setCartAnimate] = useState(false);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const isScrolling = useRef(false);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    isScrolling.current = true;
    sectionRefs.current[category]?.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => { isScrolling.current = false; }, 600);
  };

  const addItem = useCallback((id: string) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    setCartAnimate(true);
    setTimeout(() => setCartAnimate(false), 300);
  }, []);

  const removeItem = useCallback((id: string) => {
    setCart((prev) => {
      const next = { ...prev };
      if (next[id] > 1) next[id]--;
      else delete next[id];
      return next;
    });
  }, []);

  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);
  const totalPrice = Object.entries(cart).reduce((sum, [id, qty]) => {
    const item = menuItems.find((i) => i.id === id);
    return sum + (item?.price || 0) * qty;
  }, 0);

  // Intersection observer for scroll-based category highlight
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (isScrolling.current) return;
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveCategory(entry.target.getAttribute("data-section") || categories[0]);
            break;
          }
        }
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );

    categories.forEach((cat) => {
      const el = sectionRefs.current[cat];
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background pb-24 max-w-lg mx-auto">
      <MenuHeader />
      <CategoryBar activeCategory={activeCategory} onCategoryChange={handleCategoryChange} />

      <div className="px-3 pt-3">
        {categories.map((cat) => {
          const items = menuItems.filter((i) => i.category === cat);
          if (items.length === 0) return null;
          return (
            <div
              key={cat}
              ref={(el) => { sectionRefs.current[cat] = el; }}
              data-section={cat}
              className="mb-6"
            >
              <h2 className="font-display text-xl font-bold text-foreground mb-3 pl-1">
                {cat}
              </h2>
              <div className="flex flex-col gap-2">
                {items.map((item) => (
                  <MenuItemCard
                    key={item.id}
                    item={item}
                    quantity={cart[item.id] || 0}
                    onAdd={() => addItem(item.id)}
                    onRemove={() => removeItem(item.id)}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <CartFAB totalItems={totalItems} totalPrice={totalPrice} animate={cartAnimate} cart={cart} menuItems={menuItems} />
    </div>
  );
};

export default Index;
