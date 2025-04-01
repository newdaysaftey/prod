import { BaseService } from "@/app/api/services/base.service";
import prisma from "@/lib/prisma";
import { Address, OrderItem, OrderStatus, PaymentStatus } from "@prisma/client";

interface OderData {
  status: OrderStatus;
  totalAmount: number;
  deliveryFee?: number;
  serviceFee?: number;
  paymentStatus: PaymentStatus;
  paymentMethod: string | "ZELLE/CASHAPP";
  items: OrderItem[];
  shippingAddressId: string;
  shippingAddress?: Address;
  billingAddressId: string;
  billingAddress?: Address;
  deliveryDate: Date;
  paymentProof: string[];
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

    let subTotal = 0;
    for (let item of data.items) {
      subTotal += item.priceAtTime * item.quantity;
      await prisma.size.update({
        where: {
          SizeId: item.sizeId,
        },
        data: {
          Stock: {
            decrement: item.quantity,
          },
        },
      });
    }
    const tax = subTotal * (8.5 / 100);
    const deliveryFee = data.deliveryFee || 7.0;
    const serviceFee = data.serviceFee || 1.0;
    const totalAmount = subTotal + deliveryFee + serviceFee + tax;
    const order = await prisma.order.create({
      data: {
        userId: UserId,
        status: data.status,
        totalAmount: totalAmount,
        subTotal: subTotal,
        paymentStatus: data.paymentStatus,
        paymentMethod: data.paymentMethod,
        shippingAddressId: shippingAddressId,
        billingAddressId: billingAddressId,
        deliveryFee: data.deliveryFee,
        serviceFee: data.serviceFee,
        tax: tax,
        deliveryDate: data.deliveryDate, // Assuming you want to store delivery date
        paymentProof: data.paymentProof,
        orderItems: {
          create: data.items.map((item) => ({
            productId: item.productId,
            sizeId: item.sizeId,
            colorId: item.colorId,
            quantity: item.quantity,
            priceAtTime: item.priceAtTime,
          })),
        },
      },
      include: {
        shippingAddress: true,
        billingAddress: true,
        orderItems: {
          include: {
            Product: true,
            Size: true,
            Color: true,
          },
        },
      },
    });

    await prisma.cartItem.deleteMany({
      where: {
        id: {
          in: data.items.map((item) => item.id),
        },
      },
    });

    return order;
  }

  async getOrderDetails(UserId: string, role: string) {
    if (role === "ADMIN") {
      const order = await prisma.order.findMany({
        where: {},
        include: {
          shippingAddress: true,
          billingAddress: true,
          orderItems: {
            include: {
              Product: {
                select: {
                  ProductId: true,
                  Name: true,
                  Description: true,
                  Base_price: true,
                  ImageUrl: true,
                  AverageRating: true,
                },
              },
              Color: {
                select: {
                  ColorId: true,
                  ColorName: true,
                  ColorCode: true,
                  Images: true,
                  ProductId: true,
                },
              },
              Size: {
                select: {
                  SizeId: true,
                  Size: true,
                  Stock: true,
                  PriceAdjustment: true,
                  ColorId: true,
                  IsAvailable: true,
                },
              },
            },
          },
        },
      });
      return order;
    } else {
      const order = await prisma.order.findMany({
        where: {
          userId: UserId,
        },
        include: {
          shippingAddress: true,
          billingAddress: true,
          orderItems: {
            include: {
              Product: {
                select: {
                  ProductId: true,
                  Name: true,
                  Description: true,
                  Base_price: true,
                  ImageUrl: true,
                  AverageRating: true,
                },
              },
              Color: {
                select: {
                  ColorId: true,
                  ColorName: true,
                  ColorCode: true,
                  Images: true,
                  ProductId: true,
                },
              },
              Size: {
                select: {
                  SizeId: true,
                  Size: true,
                  Stock: true,
                  PriceAdjustment: true,
                  ColorId: true,
                  IsAvailable: true,
                },
              },
            },
          },
        },
      });
      return order;
    }
  }

  async getOrderById(UserId: string, orderId: string) {
    const order = await prisma.order.findUnique({
      where: {
        userId: UserId,
        orderId: orderId,
      },
      include: {
        shippingAddress: true,
        billingAddress: true,
        orderItems: {
          include: {
            Product: {
              select: {
                ProductId: true,
                Name: true,
                Description: true,
                Base_price: true,
                ImageUrl: true,
                AverageRating: true,
              },
            },
            Color: {
              select: {
                ColorId: true,
                ColorName: true,
                ColorCode: true,
                Images: true,
                ProductId: true,
              },
            },
            Size: {
              select: {
                SizeId: true,
                Size: true,
                Stock: true,
                PriceAdjustment: true,
                ColorId: true,
                IsAvailable: true,
              },
            },
          },
        },
      },
    });

    return order;
  }

  async updateOrderstatus(
    userId: string,
    orderId: string,
    orderStatus: OrderStatus
  ) {
    const order = await prisma.order.update({
      where: {
        userId: userId,
        orderId: orderId,
      },
      data: {
        status: orderStatus,
      },
    });
    return order;
  }
}
