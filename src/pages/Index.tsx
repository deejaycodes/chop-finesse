import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import { Search, X } from "lucide-react";
import MenuHeader from "@/components/MenuHeader";
import CategoryBar from "@/components/CategoryBar";
import MenuItemCard from "@/components/MenuItemCard";
import CartFAB, { buildWhatsAppMessage, WHATSAPP_NUMBER } from "@/components/CartFAB";
import OrderDrawer from "@/components/OrderDrawer";
import { categories, menuItems } from "@/data/menu";

const Index = () => {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [cart, setCart] = useState<Record<string, number>>({});
  const [cartAnimate, setCartAnimate] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [orderNote, setOrderNote] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
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

  const clearCart = useCallback(() => {
    setCart({});
    setOrderNote("");
    setDrawerOpen(false);
  }, []);

  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);
  const totalPrice = Object.entries(cart).reduce((sum, [id, qty]) => {
    const item = menuItems.find((i) => i.id === id);
    return sum + (item?.price || 0) * qty;
  }, 0);

  const isSearching = searchQuery.trim().length > 0;
  const filteredItems = useMemo(() => {
    if (!isSearching) return menuItems;
    const q = searchQuery.toLowerCase();
    return menuItems.filter(
      (i) => i.name.toLowerCase().includes(q) || i.description.toLowerCase().includes(q) || i.category.toLowerCase().includes(q)
    );
  }, [searchQuery, isSearching]);

  const handleSendWhatsApp = () => {
    const msg = buildWhatsAppMessage(cart, menuItems, totalPrice, orderNote);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
  };

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

      {/* Search Bar */}
      <div className="px-3 pt-3 pb-1">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search menu..."
            className="w-full rounded-lg border border-border bg-card py-2.5 pl-9 pr-9 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <div className="px-3 pt-2">
        {isSearching ? (
          // Search results view
          filteredItems.length === 0 ? (
            <p className="py-12 text-center text-muted-foreground font-body">
              No items found for "{searchQuery}"
            </p>
          ) : (
            <div className="flex flex-col gap-2">
              {filteredItems.map((item) => (
                <MenuItemCard
                  key={item.id}
                  item={item}
                  quantity={cart[item.id] || 0}
                  onAdd={() => addItem(item.id)}
                  onRemove={() => removeItem(item.id)}
                />
              ))}
            </div>
          )
        ) : (
          // Category view
          categories.map((cat) => {
            const items = menuItems.filter((i) => i.category === cat);
            if (items.length === 0) return null;
            return (
              <div
                key={cat}
                ref={(el) => { sectionRefs.current[cat] = el; }}
                data-section={cat}
                className="mb-6 scroll-mt-14"
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
          })
        )}
      </div>

      <CartFAB totalItems={totalItems} totalPrice={totalPrice} animate={cartAnimate} onClick={() => setDrawerOpen(true)} />
      <OrderDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        cart={cart}
        menuItems={menuItems}
        totalPrice={totalPrice}
        totalItems={totalItems}
        note={orderNote}
        onNoteChange={setOrderNote}
        onAdd={addItem}
        onRemove={removeItem}
        onClear={clearCart}
        onSendWhatsApp={handleSendWhatsApp}
      />
    </div>
  );
};

export default Index;
