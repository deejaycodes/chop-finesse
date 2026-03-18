import { ShoppingBag } from "lucide-react";
import type { MenuItem } from "@/data/menu";

interface CartFABProps {
  totalItems: number;
  totalPrice: number;
  animate: boolean;
  cart: Record<string, number>;
  menuItems: MenuItem[];
}

const formatPrice = (price: number) =>
  "₦" + price.toLocaleString();

const WHATSAPP_NUMBER = "2347025304362";

const buildWhatsAppMessage = (cart: Record<string, number>, menuItems: MenuItem[], totalPrice: number) => {
  const lines = Object.entries(cart).map(([id, qty]) => {
    const item = menuItems.find((i) => i.id === id);
    return item ? `• ${qty}x ${item.name} — ${formatPrice(item.price * qty)}` : "";
  }).filter(Boolean);

  return encodeURIComponent(
    `🍗 *New Order from Chop Finesse Menu*\n\n${lines.join("\n")}\n\n*Total: ${formatPrice(totalPrice)}*`
  );
};

const CartFAB = ({ totalItems, totalPrice, animate, cart, menuItems }: CartFABProps) => {
  if (totalItems === 0) return null;

  const handleOrder = () => {
    const msg = buildWhatsAppMessage(cart, menuItems, totalPrice);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
  };

  return (
    <div className="fixed bottom-4 left-1/2 z-30 w-[calc(100%-2rem)] max-w-lg -translate-x-1/2">
      <button
        onClick={handleOrder}
        className={`flex w-full items-center justify-between rounded-2xl bg-primary px-5 py-4 text-primary-foreground shadow-lg transition-transform ${
          animate ? "animate-cart-pop" : ""
        }`}
      >
        <div className="flex items-center gap-2">
          <ShoppingBag className="h-5 w-5" />
          <span className="font-semibold font-body">
            Order on WhatsApp ({totalItems})
          </span>
        </div>
        <span className="font-bold font-body text-lg">{formatPrice(totalPrice)}</span>
      </button>
    </div>
  );
};

export default CartFAB;
