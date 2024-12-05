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

export interface ProductTag {
  tag: {
    id: string;
    name: string;
  };
}

export interface ProductSize {
  SizeId: string;
  Size: string;
  Stock: number;
  PriceAdjustment: number;
  IsAvailable: boolean;
  isDeleted: boolean;
}

export interface ProductColor {
  ColorId: string;
  ColorName: string;
  ColorCode: string;
  Images: string[];
  Sizes: ProductSize[];
}

export interface Product {
  ProductId: string;
  Name: string;
  Description: string;
  Base_price: number;
  Tags: ProductTag[];
  ImageUrl: string | null;
  Colors: ProductColor[];
}

export interface CategoryProducts {
  CategoryId: string;
  Name: string;
  Products: Product[];
}

export interface ProductsResponse {
  error: boolean;
  message: string;
  data: {
    data: CategoryProducts[];
    metadata: {
      currentPage: number;
      totalPages: number;
      totalItems: number;
      itemsPerPage: number;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
    };
  };
}
