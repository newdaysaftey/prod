export type PaymentMethod = "ZELLE" | "CASH" | "CARD";
export type PaymentStatus = "PENDING" | "COMPLETED" | "FAILED";

export interface OrderItem {
  productId: string;
  colorId: string;
  sizeId: string;
  quantity: number;
  priceAtTime: number;
}

export interface CreateOrder {
  totalAmount: number;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  deliveryFee: number;
  serviceFee: number;
  items: OrderItem[];
  shippingAddressId: string;
  billingAddressId: string;
}
export interface Address {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  isDefault: boolean;
  isDeleted: boolean;
}

export interface OrderItem {
  id?: string;
  productId: string;
  colorId: string;
  sizeId: string;
  orderId?: string;
  quantity: number;
  priceAtTime: number;
  Product?: {
    ProductId: string;
    Name: string;
    Description: string;
    Base_price: number;
    ImageUrl: string | null;
    AverageRating: number | null;
  };
  Color?: {
    ColorId: string;
    ColorName: string;
    ColorCode: string;
    Images: string[];
    ProductId: string;
  };
  Size?: {
    SizeId: string;
    Size: string;
    Stock: number;
    PriceAdjustment: number;
    ColorId: string;
    IsAvailable: boolean;
  };
}

export interface Order {
  orderId: string;
  userId: string;
  status: string;
  totalAmount: number;
  subTotal: number;
  deliveryFee: number;
  serviceFee: number;
  tax: number;
  paymentStatus: string;
  paymentMethod: string;
  shippingAddressId: string;
  billingAddressId: string;
  orderDate: string;
  deliveryDate: string | null;
  shippingAddress: Address;
  billingAddress: Address;
  orderItems: OrderItem[];
}

export interface ApiResponse<T> {
  error: boolean;
  message: string;
  data: T;
}
export interface UpdatePaymentStatusResponse {
  error: boolean;
  message: string;
  data: Order;
}
