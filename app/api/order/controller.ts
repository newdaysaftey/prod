import { BaseController } from "@/app/api/controllers/base.controller";
import { OrderService } from "./service";
import { Address, OrderItem, OrderStatus, PaymentStatus } from "@prisma/client";

interface OrderBody {
  status: OrderStatus;
  totalAmount: number;
  deliveryFee?: number;
  serviceFee?: number;
  tax?: number;
  paymentStatus: PaymentStatus;
  paymentMethod: "ZELLE";
  items: OrderItem[];
  shippingAddressId: string;
  shippingAddress?: Address;
  billingAddressId: string;
  billingAddress?: Address;
  deliveryDate: Date;
}

export class OrderController extends BaseController {
  [x: string]: any;
  private service: OrderService;

  constructor() {
    super();
    this.service = new OrderService();
  }

  async createOrder(UserId: string, data: OrderBody) {
    try {
      const user = await this.service.createOrder(UserId, data);
      return this.sendSuccess(user, "order created successfully");
    } catch (error) {
      return this.sendError(error as Error);
    }
  }

  async getOrderDetails(UserId: string, role: string) {
    try {
      const user = await this.service.getOrderDetails(UserId, role);
      return this.sendSuccess(user, "order's Details Fetched successfully");
    } catch (error) {
      return this.sendError(error as Error);
    }
  }

  async getOrderById(UserId: string, orderId: string) {
    try {
      const user = await this.service.getOrderById(UserId, orderId);
      return this.sendSuccess(user, "order Details Fetched successfully");
    } catch (error) {
      return this.sendError(error as Error);
    }
  }
}
