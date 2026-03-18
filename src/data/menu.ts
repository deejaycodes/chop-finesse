import fusionBoxImg from "@/assets/fusion-box.jpg";
import partyBoxImg from "@/assets/party-box.jpg";
import wingsImg from "@/assets/signature-wings.jpg";
import sidesImg from "@/assets/sides.jpg";
import saladImg from "@/assets/chicken-salad.jpg";
import dipsImg from "@/assets/dips.jpg";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  tag?: string;
  
  flavors?: string[];
}

export const categories = [
  "Fusion Boxes",
  "Signature Wings",
  "Sides",
  "Salads",
  "Add-Ons",
];

export const wingFlavors = [
  "🔥 Spicy Pepper",
  "🍯 Honey Garlic",
  "🍋 Lemon Pepper",
  "🌶 Sweet Chili",
  "🔥 Buffalo Heat",
  "⭐ Chop Finesse Special",
];

export const menuItems: MenuItem[] = [
  {
    id: "solo-box",
    name: "The Solo Box",
    description: "4 Wings • Fries • Dip",
    price: 6500,
    image: fusionBoxImg,
    category: "Fusion Boxes",
  },
  {
    id: "fusion-box",
    name: "The Fusion Box",
    description: "6 Wings • Fries • Salad",
    price: 8500,
    image: fusionBoxImg,
    category: "Fusion Boxes",
  },
  {
    id: "big-chop-box",
    name: "The Big Chop Box",
    description: "10 Wings • Fries • Sweet Potato Fries • Dips",
    price: 12000,
    image: fusionBoxImg,
    category: "Fusion Boxes",
    popular: true,
  },
  {
    id: "chop-party-box",
    name: "The Chop Party Box",
    description: "20 Wings • Large Fries • Yam Fries • 4 Dips",
    price: 20000,
    image: partyBoxImg,
    category: "Fusion Boxes",
    tag: "Perfect for the crew!",
  },
  {
    id: "wings-4",
    name: "Signature Wings (4pc)",
    description: "Pick your favorite flavor!",
    price: 4000,
    image: wingsImg,
    category: "Signature Wings",
    flavors: wingFlavors,
    popular: true,
  },
  {
    id: "wings-8",
    name: "Signature Wings (8pc)",
    description: "Pick your favorite flavor!",
    price: 6000,
    image: wingsImg,
    category: "Signature Wings",
    flavors: wingFlavors,
  },
  {
    id: "fries",
    name: "Fries",
    description: "Classic golden fries",
    price: 1000,
    image: sidesImg,
    category: "Sides",
  },
  {
    id: "yam-fries",
    name: "Yam Fries",
    description: "Crispy seasoned yam fries",
    price: 1500,
    image: sidesImg,
    category: "Sides",
  },
  {
    id: "sweet-potato-fries",
    name: "Sweet Potato Fries",
    description: "Sweet & crispy potato fries",
    price: 1500,
    image: sidesImg,
    category: "Sides",
  },
  {
    id: "chicken-salad",
    name: "Chicken Salad",
    description: "Fresh & Tasty! Grilled chicken with fresh greens",
    price: 10000,
    image: saladImg,
    category: "Salads",
  },
  {
    id: "extra-dip",
    name: "Extra Dip",
    description: "Additional dipping sauce of your choice",
    price: 500,
    image: dipsImg,
    category: "Add-Ons",
  },
];
