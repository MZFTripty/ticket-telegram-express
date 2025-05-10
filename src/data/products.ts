
// Sample product data

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  available: boolean;
}

export const products: Product[] = [
  {
    id: "P001",
    name: "Bluetooth Speaker",
    description: "Portable, rechargeable Bluetooth speaker with FM radio.",
    price: 950,
    available: true,
  },
  {
    id: "P002",
    name: "Wireless Earbuds",
    description: "TWS earbuds with touch control and noise cancellation.",
    price: 1200,
    available: true,
  },
  {
    id: "P003",
    name: "Power Bank",
    description: "20000mAh fast charging power bank with dual USB ports.",
    price: 750,
    available: false,
  },
  {
    id: "P004",
    name: "USB Flash Drive",
    description: "64GB USB 3.0 flash drive with metal casing.",
    price: 450,
    available: true,
  },
  {
    id: "P005",
    name: "Smartphone Case",
    description: "Premium silicone case with shockproof protection.",
    price: 350,
    available: true,
  },
  {
    id: "P006", 
    name: "HDMI Cable",
    description: "2m high-speed HDMI cable with gold-plated connectors.",
    price: 280,
    available: true,
  },
  {
    id: "P007",
    name: "Gaming Mouse",
    description: "RGB gaming mouse with 6 programmable buttons.",
    price: 850,
    available: true,
  }
];
