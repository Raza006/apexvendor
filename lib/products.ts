export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number; // Made required for the fake discount effect
  description: string[];
  image: string;
  pdfFileName?: string; // Optional: Name of the PDF file in /public/pdfs/
  vendorUrl?: string; // Optional: Direct vendor link
}

export const products: Product[] = [
  {
    id: "elite-bundle",
    name: "Every Single Vendor",
    price: 0.50,
    originalPrice: 79.99,
    description: [
      "20+ Suppliers",
      "Most USA Based",
      "Passing Serial"
    ],
    image: "/assets/All Vendor.png",
    pdfFileName: "elite-bundle-instructions.pdf"
  },
  {
    id: "hair-dryer",
    name: "Hair Dryer Supplier",
    price: 9.99,
    originalPrice: 24.99,
    description: [
      "3-7 Day USA Shipping"
    ],
    image: "/assets/Dyson.png",
    vendorUrl: "https://x.alibaba.com/B13h9J?ck=minisite"
  },
  {
    id: "labu",
    name: "Labu Supplier",
    price: 0.50,
    originalPrice: 19.99,
    description: [
      "10 plus Days Shipping"
    ],
    image: "/assets/Labubu.png",
    vendorUrl: "https://x.alibaba.com/B13h9J?ck=minisite"
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
    image: "/assets/Maxes.png",
    vendorUrl: "https://x.alibaba.com/xK7TdZX?ck=minisite"
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
    image: "/assets/Moissanite.png",
    vendorUrl: "https://www.alibaba.com/x/xozVU2T?ck=pdp"
  },
  {
    id: "shoes",
    name: "Shoe Supplier",
    price: 9.99,
    originalPrice: 29.99,
    description: [
      "15 plus shoe variants, comes with boxes."
    ],
    image: "/assets/Shoes.png",
    vendorUrl: "https://x.alibaba.com/xbjSpmK?ck=minisite"
  },
  {
    id: "clothing",
    name: "Clothing Bundle Pack",
    price: 15.99,
    originalPrice: 39.99,
    description: [
      "7 Clothing Vendors in one"
    ],
    image: "/assets/Clothing Bundle.png",
    pdfFileName: "clothing-instructions.pdf"
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
    image: "/assets/AirPods.png",
    vendorUrl: "https://x.alibaba.com/xWN66cN?ck=minisite"
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
    image: "/assets/Colognes.png",
    vendorUrl: "https://x.alibaba.com/xWN66cN?ck=minisite"
  },
  {
    id: "lulu",
    name: "Lulu Supplier",
    price: 9.99,
    originalPrice: 24.99,
    description: [
      "6-10 Bussiness day shipping"
    ],
    image: "/assets/Lululemon.png",
    vendorUrl: "https://liaotu.en.alibaba.com/index.html?spm=a2700.details.0.0.26596f30wHPRVr&from=detail&productId=1601320892973"
  }
];
