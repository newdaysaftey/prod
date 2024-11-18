import { BaseService } from "@/app/api/services/base.service";
import prisma from "@/lib/prisma";
import { Address, OrderItem, OrderStatus, PaymentStatus } from "@prisma/client";

interface OderData {
  status: OrderStatus;
  totalAmount: number;
  paymentStatus: PaymentStatus;
  paymentMethod: "ZELLE";
  items: OrderItem[];
  shippingAddressId: string;
  shippingAddress?: Address;
  billingAddressId: string;
  billingAddress?: Address;
  deliveryDate: Date;
}

export class OrderService extends BaseService {
  async createOrder(UserId: string, data: OderData) {
    let shippingAddressId = data.shippingAddressId || "";
    let billingAddressId = data.billingAddressId || "";
    if (data.shippingAddress && !data.shippingAddressId) {
      const address = await prisma.address.create({
        data: {
          userId: UserId,
          firstName: data.shippingAddress.firstName,
          lastName: data.shippingAddress.lastName,
          street: data.shippingAddress.street,
          city: data.shippingAddress.city,
          state: data.shippingAddress.state,
          country: data.shippingAddress.country,
          pincode: data.shippingAddress.pincode,
          isDefault: data.shippingAddress.isDefault,
        },
      });
      shippingAddressId = address.id;
    }

    if (data.billingAddress && !data.billingAddressId) {
      const address = await prisma.address.create({
        data: {
          userId: UserId,
          firstName: data.billingAddress.firstName,
          lastName: data.billingAddress.lastName,
          street: data.billingAddress.street,
          city: data.billingAddress.city,
          state: data.billingAddress.state,
          country: data.billingAddress.country,
          pincode: data.billingAddress.pincode,
          isDefault: data.billingAddress.isDefault,
        },
      });
      billingAddressId = address.id;
    }

    let totalAmount = data.totalAmount | 0;
    for (let item of data.items) {
      totalAmount += item.PriceAtTime * item.Quantity;
      await prisma.size.update({
        where: {
          SizeId: item.SizeId,
        },
        data: {
          Stock: {
            decrement: item.Quantity,
          },
        },
      });
    }

    const order = await prisma.order.create({
      data: {
        userId: UserId,
        status: data.status,
        totalAmount: totalAmount,
        paymentStatus: data.paymentStatus,
        paymentMethod: data.paymentMethod,
        items: data.items,
        shippingAddressId: shippingAddressId,
        billingAddressId: billingAddressId,
      },
      include: {
        shippingAddress: true,
      },
    });

    return order;
  }

}
