import { Plus, Minus } from "lucide-react";
import type { MenuItem } from "@/data/menu";

interface MenuItemCardProps {
  item: MenuItem;
  quantity: number;
  onAdd: () => void;
  onRemove: () => void;
}

const formatPrice = (price: number) =>
  "₦" + price.toLocaleString();

const MenuItemCard = ({ item, quantity, onAdd, onRemove }: MenuItemCardProps) => {
  return (
    <div className="flex gap-3 rounded-lg bg-card p-3 shadow-sm border border-border">
      <div className="flex-1 min-w-0">
        <h3 className="font-display text-base font-bold text-card-foreground leading-tight">
          {item.name}
        </h3>
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
              onClick={onAdd}
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
  );
};

export default MenuItemCard;
