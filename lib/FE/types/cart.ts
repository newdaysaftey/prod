export interface CartItem {
  productId: string;
  colorId: string;
  sizeId: string;
  quantity: number;
  priceAtTime: number;
}

export interface CartProduct {
  ProductId: string;
  Name: string;
  Base_price: number;
  CategoryId: string;
  ImageUrl: string;
}

export interface CartColor {
  ColorId: string;
  ColorCode: string;
  ColorName: string;
  Images: string[];
}

export interface CartSize {
  SizeId: string;
  Size: string;
  Stock: number;
  PriceAdjustment: number;
}

export interface CartItemDetail {
  productId: string;
  colorId: string;
  sizeId: string;
  quantity: number;
  priceAtTime: number;
  Product: CartProduct;
  Color: CartColor;
  Size: CartSize;
  subTotal: number;
}

export interface Cart {
  cartItems: CartItemDetail[];
  UserId: string;
  CartId: string;
  totalAmount: number;
}
