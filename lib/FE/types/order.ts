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
