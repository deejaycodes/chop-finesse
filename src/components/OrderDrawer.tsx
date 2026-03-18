import { Plus, Minus, Trash2, Send, StickyNote } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import type { MenuItem } from "@/data/menu";

interface OrderDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cart: Record<string, number>;
  menuItems: MenuItem[];
  totalPrice: number;
  totalItems: number;
  note: string;
  onNoteChange: (note: string) => void;
  onAdd: (id: string) => void;
  onRemove: (id: string) => void;
  onClear: () => void;
  onSendWhatsApp: () => void;
}

const formatPrice = (price: number) => "₦" + price.toLocaleString();

const OrderDrawer = ({
  open,
  onOpenChange,
  cart,
  menuItems,
  totalPrice,
  totalItems,
  note,
  onNoteChange,
  onAdd,
  onRemove,
  onClear,
  onSendWhatsApp,
}: OrderDrawerProps) => {
  const cartEntries = Object.entries(cart)
    .map(([id, qty]) => {
      const item = menuItems.find((i) => i.id === id);
      return item ? { item, qty } : null;
    })
    .filter(Boolean) as { item: MenuItem; qty: number }[];

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[85vh]">
        <DrawerHeader className="pb-2">
          <DrawerTitle className="font-display text-xl">Your Order</DrawerTitle>
          <DrawerDescription>
            {totalItems} {totalItems === 1 ? "item" : "items"} · {formatPrice(totalPrice)}
          </DrawerDescription>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto px-4 pb-2">
          {cartEntries.length === 0 ? (
            <p className="py-8 text-center text-muted-foreground font-body">
              Your order is empty
            </p>
          ) : (
            <div className="flex flex-col gap-3">
              {cartEntries.map(({ item, qty }) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 rounded-lg border border-border bg-card p-3"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-12 w-12 rounded-md object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-display text-sm font-bold text-card-foreground truncate">
                      {item.name}
                    </h4>
                    <p className="text-sm font-body text-muted-foreground">
                      {formatPrice(item.price * qty)}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onRemove(item.id)}
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-border text-muted-foreground hover:bg-muted transition-colors"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-6 text-center text-sm font-semibold font-body">
                      {qty}
                    </span>
                    <button
                      onClick={() => onAdd(item.id)}
                      className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-all"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}

              {/* Order Note */}
              <div className="mt-1">
                <label className="flex items-center gap-1.5 text-sm font-semibold text-foreground font-body mb-1.5">
                  <StickyNote className="h-4 w-4" />
                  Add a note
                </label>
                <textarea
                  value={note}
                  onChange={(e) => onNoteChange(e.target.value)}
                  placeholder="E.g. Extra spicy wings, no onions..."
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                  rows={2}
                />
              </div>
            </div>
          )}
        </div>

        <DrawerFooter className="pt-2 gap-2">
          {cartEntries.length > 0 && (
            <>
              <Button onClick={onSendWhatsApp} className="w-full gap-2 font-body text-base py-5">
                <Send className="h-4 w-4" />
                Send Order on WhatsApp · {formatPrice(totalPrice)}
              </Button>
              <Button
                variant="outline"
                onClick={onClear}
                className="w-full gap-2 font-body text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
                Clear Order
              </Button>
            </>
          )}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default OrderDrawer;
