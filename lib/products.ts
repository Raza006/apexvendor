export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number; // Made required for the fake discount effect
  description: string[];
  image: string;
}

export const products: Product[] = [
  {
    id: "elite-bundle",
    name: "Every Single Vendor",
    price: 29.99,
    originalPrice: 79.99,
    description: [
      "20+ Suppliers",
      "Most USA Based",
      "Passing Serial"
    ],
    image: "/assets/All Vendor.png"
  },
  {
    id: "hair-dryer",
    name: "Hair Dryer Supplier",
    price: 9.99,
    originalPrice: 24.99,
    description: [
      "3-7 Day USA Shipping"
    ],
    image: "/assets/Dyson.png"
  },
  {
    id: "labu",
    name: "Labu Supplier",
    price: 9.99,
    originalPrice: 19.99,
    description: [
      "10 plus Days Shipping"
    ],
    image: "/assets/Labubu.png"
  },
  {
    id: "max-supplier",
    name: "Max Supplier",
    price: 9.99,
    originalPrice: 29.99,
    description: [
      "Valid Code",
      "USA Warehouse",
      "Device Care"
    ],
    image: "/assets/Maxes.png"
  },
  {
    id: "moissanite",
    name: "Moissanite Supplier",
    price: 19.99,
    originalPrice: 49.99,
    description: [
      "100 plus moissanite products",
      "Diamond Tester Passing",
      "Best Quality Moissanite",
      "VVS Moissanite",
      "Shine Brighter than REAL Diamond"
    ],
    image: "/assets/Moissanite.png"
  },
  {
    id: "shoes",
    name: "Shoe Supplier",
    price: 9.99,
    originalPrice: 29.99,
    description: [
      "15 plus shoe variants, comes with boxes."
    ],
    image: "/assets/Shoes.png"
  },
  {
    id: "clothing",
    name: "Clothing Bundle Pack",
    price: 15.99,
    originalPrice: 39.99,
    description: [
      "7 Clothing Vendors in one"
    ],
    image: "/assets/Clothing Bundle.png"
  },
  {
    id: "pods",
    name: "Pod Supplier",
    price: 9.99,
    originalPrice: 24.99,
    description: [
      "Valid Code",
      "USA Warehouse",
      "1, 2, 3, 4, Pro, Max, etc"
    ],
    image: "/assets/AirPods.png"
  },
  {
    id: "cologne",
    name: "Cologne Supplier Pack",
    price: 15.99,
    originalPrice: 35.99,
    description: [
      "Every single cologne in one vendor",
      "5-7 Day USA Shipping"
    ],
    image: "/assets/Colognes.png"
  },
  {
    id: "lulu",
    name: "Lulu Supplier",
    price: 9.99,
    originalPrice: 24.99,
    description: [
      "6-10 Bussiness day shipping"
    ],
    image: "/assets/Lululemon.png"
  }
];
