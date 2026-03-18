import { ShoppingBag } from "lucide-react";
import type { MenuItem } from "@/data/menu";
import type { RecipientInfo } from "@/components/OrderDrawer";

interface CartFABProps {
  totalItems: number;
  totalPrice: number;
  animate: boolean;
  onClick: () => void;
}

const formatPrice = (price: number) =>
  "₦" + price.toLocaleString();

export const WHATSAPP_NUMBER = "2347025304362";

export const buildWhatsAppMessage = (cart: Record<string, number>, menuItems: MenuItem[], totalPrice: number, note: string, cartFlavors?: Record<string, string[]>, recipient?: RecipientInfo) => {
  const lines = Object.entries(cart).map(([id, qty]) => {
    const item = menuItems.find((i) => i.id === id);
    if (!item) return "";
    let line = `• ${qty}x ${item.name} — ${formatPrice(item.price * qty)}`;
    const flavors = cartFlavors?.[id];
    if (flavors?.length) {
      line += `\n  Flavors: ${flavors.join(", ")}`;
    }
    return line;
  }).filter(Boolean);

  let msg = `🍗 *New Order from Chop Finesse Menu*\n\n${lines.join("\n")}\n\n*Total: ${formatPrice(totalPrice)}*`;
  if (note.trim()) {
    msg += `\n\n📝 *Note:* ${note.trim()}`;
  }
  if (recipient?.name.trim()) {
    msg += `\n\n👤 *Deliver to:*\nName: ${recipient.name.trim()}`;
    if (recipient.phone.trim()) msg += `\nPhone: ${recipient.phone.trim()}`;
    if (recipient.address.trim()) msg += `\nAddress: ${recipient.address.trim()}`;
  }
  return encodeURIComponent(msg);
};

const CartFAB = ({ totalItems, totalPrice, animate, onClick }: CartFABProps) => {
  if (totalItems === 0) return null;

  return (
    <div className="fixed bottom-4 left-1/2 z-30 w-[calc(100%-2rem)] max-w-lg -translate-x-1/2">
      <button
        onClick={onClick}
        className={`flex w-full items-center justify-between rounded-2xl bg-primary px-5 py-4 text-primary-foreground shadow-lg transition-transform ${
          animate ? "animate-cart-pop" : ""
        }`}
      >
        <div className="flex items-center gap-2">
          <ShoppingBag className="h-5 w-5" />
          <span className="font-semibold font-body">
            View Order ({totalItems})
          </span>
        </div>
        <span className="font-bold font-body text-lg">{formatPrice(totalPrice)}</span>
      </button>
    </div>
  );
};

export default CartFAB;
