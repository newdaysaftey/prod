import { BaseController } from "@/app/api/controllers/base.controller";
import { PaymentService } from "./service";
import { PaymentStatus } from "@prisma/client";
import { NextRequest } from "next/server";

export class PaymentController extends BaseController {
  [x: string]: any;
  private service: PaymentService;

  constructor() {
    super();
    this.service = new PaymentService();
  }

  async updatePayment(request: NextRequest) {
    try {
      const searchParams = request.nextUrl.searchParams;
      const orderId = searchParams.get("orderId");
      if (!orderId) {
        return this.sendError(new Error("Order ID is required"));
      }
      const paymentStatusParam = searchParams.get("paymentStatus");
      if (
        !paymentStatusParam ||
        !Object.values(PaymentStatus).includes(
          paymentStatusParam as PaymentStatus
        )
      ) {
        return this.sendError(new Error("Invalid payment status"));
      }
      const paymentStatus: PaymentStatus = paymentStatusParam as PaymentStatus;

      const user = await this.service.updatePayment(orderId, paymentStatus);
      return this.sendSuccess(user, "payment updated successfully");
    } catch (error) {
      return this.sendError(error as Error);
    }
  }
}
