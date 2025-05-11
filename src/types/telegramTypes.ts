
import { products } from "@/data/products";

export type BotState = 
  | "welcome"
  | "askProductId"
  | "showProduct"
  | "askAddress"
  | "orderConfirmation";

export interface Message {
  text: string;
  sender: "bot" | "user";
  timestamp: Date;
}

export interface ActiveOrder {
  productId?: string;
  product?: typeof products[0];
  address?: string;
}
