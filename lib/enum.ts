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
