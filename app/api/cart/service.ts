//
import { BaseService } from "@/app/api/services/base.service";
import prisma from "@/lib/prisma";

interface CartItemData {
  ProductId: string;
  ColorId: string;
  SizeId: string;
  Quantity: number;
  PriceAtTime: number;
}

interface CartData {
  UserId: string;
  cartItems: CartItemData[];
}

interface cartItemsWithDetails {
  subTotal: number;
  ProductId: any;
  ColorId: any;
  SizeId: any;
  PriceAtTime: number;
  Quantity: number;
}

export class CartService extends BaseService {
  async addtoCart(data: CartData) {
    let totalPrice = 0;

    // Create a new array to store unique items
    const uniqueItems: CartItemData[] = [];

    for (const item of data.cartItems) {
      // Check if the item already exists in the cart (based on ProductId, ColorId, and SizeId)
      const existingItem = uniqueItems.find(
        (uniqueItem) =>
          uniqueItem.ProductId === item.ProductId &&
          uniqueItem.ColorId === item.ColorId &&
          uniqueItem.SizeId === item.SizeId
      );

      // If the item already exists, we should update the quantity
      if (existingItem) {
        existingItem.Quantity += item.Quantity;
      } else {
        // Otherwise, process the item and add it to the uniqueItems array
        // Verify product exists and is active
        const product = await prisma.product.findFirst({
          where: {
            ProductId: item.ProductId,
            IsActive: true,
            IsDeleted: false,
          },
          include: {
            Colors: {
              include: {
                Sizes: true,
              },
            },
          },
        });

        if (!product) {
          throw new Error(`Product ${item.ProductId} not found or inactive`);
        }

        // Verify color exists for the product
        const color = product.Colors.find((c) => c.ColorId === item.ColorId);
        if (!color) {
          throw new Error(
            `Color ${item.ColorId} not found for product ${item.ProductId}`
          );
        }

        // Verify size exists for the color and has sufficient stock
        const size = color.Sizes.find((s) => s.SizeId === item.SizeId);
        if (!size) {
          throw new Error(
            `Size ${item.SizeId} not found for color ${item.ColorId}`
          );
        }

        if (!size.IsAvailable || size.Stock < item.Quantity) {
          throw new Error(
            `Insufficient stock for product ${item.ProductId} in selected color and size`
          );
        }

        // Calculate the correct price
        const finalPrice = product.Base_price + size.PriceAdjustment;
        item.PriceAtTime = finalPrice;

        // Add the item to the uniqueItems array
        uniqueItems.push(item);
      }
    }

    for (const item of uniqueItems) {
      totalPrice += item.PriceAtTime * item.Quantity;
    }

    // Now update the user's cart in the database with the uniqueItems array
    const cart = await prisma.user.update({
      where: {
        UserId: data.UserId,
      },
      data: {
        cartItems: uniqueItems,
      },
      select: {
        UserId: true,
        cartItems: true,
      },
    });

    return { ...cart, totalPrice };
  }

  async getCart(UserId: string) {
    const cart = await prisma.user.findUnique({
      where: {
        UserId: UserId,
      },
      select: {
        cartItems: true,
        UserId: true,
      },
    });
    if (!cart) {
      return null;
    }

    const cartItemsWithDetails: cartItemsWithDetails[] = await Promise.all(
      cart.cartItems.map(async (item) => {
        // Get product details
        const product = await prisma.product.findUnique({
          where: {
            ProductId: item.ProductId,
            IsDeleted: false,
            IsActive: true,
          },
          select: {
            ProductId: true,
            Name: true,
            Base_price: true,
            CategoryId: true,
            ImageUrl: true,
          },
        });

        if (!product) {
          throw new Error(
            `Product ${item.ProductId} not found or is no longer available`
          );
        }

        // Get color details with its sizes
        const color = await prisma.color.findUnique({
          where: {
            ColorId: item.ColorId,
          },
          select: {
            // ColorId: true,
            ColorCode: true,
            ColorName: true,
            Images: true,
          },
        });

        if (!color) {
          throw new Error(`Color ${item.ColorId} not found`);
        }

        // Get specific size details
        const size = await prisma.size.findUnique({
          where: {
            SizeId: item.SizeId,
          },
          select: {
            // SizeId: true,
            Size: true,
            Stock: true,
            PriceAdjustment: true,
          },
        });

        if (!size) {
          throw new Error(`Size ${item.SizeId} not found`);
        }

        // Calculate subtotal for this item
        const subTotal = item.PriceAtTime * item.Quantity;

        return {
          ...item,
          Product: product,
          Color: color,
          Size: size,
          subTotal,
        };
      })
    );

    const totalAmount = cartItemsWithDetails.reduce(
      (sum, item) => sum + item.subTotal,
      0
    );
    return {
      ...cart,
      cartItems: cartItemsWithDetails,
      totalAmount,
    };
    // return {
    //   ...cart,
    //   Items: cartItemsWithDetails.map((item) => ({
    //     ...item,
    //     product: {
    //       ...item.product,
    //       currentPrice: item.product.Base_price + item.size.PriceAdjustment,
    //       stockAvailable: item.size.Stock,
    //       isAvailable: item.size.IsAvailable,
    //     },
    //     color: {
    //       ...item.color,
    //       availableSizes: item.color.Sizes.filter(
    //         (s: { IsAvailable: any; Stock: number }) =>
    //           s.IsAvailable && s.Stock > 0
    //       ),
    //     },
    //   })),
    //   totalAmount,
    // };
  }
}
