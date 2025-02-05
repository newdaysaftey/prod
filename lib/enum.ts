export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
}
export enum Size {
  S = "S",
  M = "M",
  L = "L",
  XL = "XL",
  SIZE_2XL = "SIZE_2XL",
  SIZE_3XL = "SIZE_3XL",
  SIZE_4XL = "SIZE_4XL",
  SIZE_5XL = "SIZE_5XL",
}

export type ColorType = {
  id: string;
  ColorName: string;
  ColorCode: string;
  Images: string[];
  Sizes: SizeType[];
};

export type SizeType = {
  id: string;
  Size: string;
  Stock: number;
  PriceAdjustment: number;
  SKU: string;
  IsAvailable: boolean;
};

export type productType =
  | "SHIRTS_PANTS"
  | "HELMET"
  | "SHOES"
  | "MASK"
  | "GLOVES";

export const shirtPantSizes = [
  "XS",
  "S",
  "M",
  "L",
  "XL",
  "XXL",
  "3XL",
  "4XL",
  "5XL",
];
export const shoeSizes = ["5", "6", "7", "8", "9", "10", "11", "12", "13"];
export const helmetSizes = ["XS", "M", "L", "XL"];
export const productTypes = [
  "SHIRTS_PANTS",
  "HELMET",
  "SHOES",
  "MASK",
  "GLOVES",
];
