import { useState } from "react";
import { Plus, Minus, TrendingUp } from "lucide-react";
import type { MenuItem } from "@/data/menu";
import FlavorPicker from "@/components/FlavorPicker";

interface MenuItemCardProps {
  item: MenuItem;
  quantity: number;
  onAdd: (flavor?: string) => void;
  onRemove: () => void;
}

const formatPrice = (price: number) =>
  "₦" + price.toLocaleString();

const MenuItemCard = ({ item, quantity, onAdd, onRemove }: MenuItemCardProps) => {
  const [flavorOpen, setFlavorOpen] = useState(false);

  const handleAdd = () => {
    if (item.flavors && item.flavors.length > 0) {
      setFlavorOpen(true);
    } else {
      onAdd();
    }
  };

  return (
    <>
      <div className="flex gap-3 rounded-lg bg-card p-3 shadow-sm border border-border">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <h3 className="font-display text-base font-bold text-card-foreground leading-tight">
              {item.name}
            </h3>
            {item.popular && (
              <span className="inline-flex items-center gap-0.5 rounded-full bg-accent px-1.5 py-0.5 text-[10px] font-bold text-accent-foreground">
                <TrendingUp className="h-2.5 w-2.5" />
                Popular
              </span>
            )}
          </div>
          {item.tag && (
            <span className="mt-1 inline-block rounded-full bg-accent px-2 py-0.5 text-xs font-semibold text-accent-foreground">
              {item.tag}
            </span>
          )}
          <p className="mt-1 text-xs text-muted-foreground line-clamp-2 font-body">
            {item.description}
          </p>
          <div className="mt-2 flex items-center gap-3">
            <span className="text-lg font-bold text-foreground font-body">
              {formatPrice(item.price)}
            </span>
            <div className="flex items-center gap-1 ml-auto">
              {quantity > 0 && (
                <>
                  <button
                    onClick={onRemove}
                    className="flex h-7 w-7 items-center justify-center rounded-full border border-border text-muted-foreground hover:bg-muted transition-colors"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="w-6 text-center text-sm font-semibold font-body">
                    {quantity}
                  </span>
                </>
              )}
              <button
                onClick={handleAdd}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-all active:scale-95"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
        <img
          src={item.image}
          alt={item.name}
          className="h-20 w-20 rounded-lg object-cover flex-shrink-0"
          loading="lazy"
        />
      </div>

      {item.flavors && (
        <FlavorPicker
          open={flavorOpen}
          onOpenChange={setFlavorOpen}
          flavors={item.flavors}
          itemName={item.name}
          onSelect={(flavor) => {
            onAdd(flavor);
            setFlavorOpen(false);
          }}
        />
      )}
    </>
  );
};

export default MenuItemCard;
