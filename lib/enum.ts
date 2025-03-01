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
  | "SHIRTS"
  | "HELMET"
  | "SHOES"
  | "MASK"
  | "GLOVES"
  | "PANTS";

export const shirtPantSizes = ["S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"];
export const pantSizes = [
  "One Size Fits All",
  "S",
  "M",
  "L",
  "XL",
  "2XL",
  "3XL",
  "4XL",
  "5XL",
];
export const maskSizes = ["One Size Fits All", "XS", "S", "M", "L", "XL"];
export const shoeSizes = [
  "5",
  "5.5",
  "6",
  "6.5",
  "7",
  "7.5",
  "8",
  "8.5",
  "9",
  "9.5",
  "10",
  "10.5",
  "11",
  "11.5",
  "12",
];
export const helmetSizes = ["One Size Fits All", "S", "M", "L", "XL"];
export const gloveSizes = [
  "One size Fits all",
  "XS",
  "S",
  "M",
  "S/M",
  "L",
  "XL",
  "L/XL",
];
export const productTypes = [
  "SHIRTS",
  "HELMET",
  "SHOES",
  "MASK",
  "GLOVES",
  "PANTS",
];
