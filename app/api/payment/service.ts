//
import { BaseService } from "@/app/api/services/base.service";
import prisma from "@/lib/prisma";
import { PaymentStatus } from "@prisma/client";

export class PaymentService extends BaseService {
  async updatePayment(orderId: string, paymentStatus: PaymentStatus) {
    const updatePayment = await prisma.order.update({
      where: {
        orderId: orderId,
      },
      data: {
        paymentStatus: paymentStatus,
      },
    });

    return updatePayment;
  }
}
