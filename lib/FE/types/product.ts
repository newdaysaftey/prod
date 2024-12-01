export interface Size {
  Size: string;
  SizeId: string;
  Stock: number;
  PriceAdjustment: number;
  isDeleted: boolean;
}

export interface ColorVariant {
  ColorId: string;
  ColorName: string;
  ColorCode: string;
  Images: string[];
  Sizes: Size[];
}

export interface ProductFormData {
  step: number;
  ProductId: string;
  Colors: ColorVariant[];
}
