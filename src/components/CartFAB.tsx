import { ShoppingBag } from "lucide-react";

interface CartFABProps {
  totalItems: number;
  totalPrice: number;
  animate: boolean;
}

const formatPrice = (price: number) =>
  "₦" + price.toLocaleString();

const CartFAB = ({ totalItems, totalPrice, animate }: CartFABProps) => {
  if (totalItems === 0) return null;

  return (
    <div className="fixed bottom-4 left-1/2 z-30 w-[calc(100%-2rem)] max-w-lg -translate-x-1/2">
      <button
        className={`flex w-full items-center justify-between rounded-2xl bg-primary px-5 py-4 text-primary-foreground shadow-lg transition-transform ${
          animate ? "animate-cart-pop" : ""
        }`}
      >
        <div className="flex items-center gap-2">
          <ShoppingBag className="h-5 w-5" />
          <span className="font-semibold font-body">
            View Order ({totalItems} {totalItems === 1 ? "item" : "items"})
          </span>
        </div>
        <span className="font-bold font-body text-lg">{formatPrice(totalPrice)}</span>
      </button>
    </div>
  );
};

export default CartFAB;
