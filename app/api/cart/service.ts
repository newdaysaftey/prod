import { BaseService } from "@/app/api/services/base.service";
import prisma from "@/lib/prisma";
import { CartItem } from "@prisma/client";

interface CartItemData {
  productId: string;
  colorId: string;
  sizeId: string;
  quantity: number;
  priceAtTime: number;
}

interface CartData {
  UserId: string;
  cartItems: CartItemData[];
}

export class CartService extends BaseService {
  async addtoCart(data: CartData) {
    let totalPrice = 0;

    // Create a new array to store unique items
    const uniqueItems: CartItemData[] = [];

    for (const item of data.cartItems) {
      // Check if the item already exists in the uniqueItems array (based on ProductId, ColorId, and SizeId)
      const existingItem = uniqueItems.find(
        (uniqueItem) =>
          uniqueItem.productId === item.productId &&
          uniqueItem.colorId === item.colorId &&
          uniqueItem.sizeId === item.sizeId
      );

      // If the item exists, update the quantity
      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        // Otherwise, process the item and add it to the uniqueItems array
        // Verify product exists and is active
        const product = await prisma.product.findFirst({
          where: {
            ProductId: item.productId,
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
          throw new Error(`Product ${item.productId} not found or inactive`);
        }

        // Verify color exists for the product
        const color = product.Colors.find((c) => c.ColorId === item.colorId);
        if (!color) {
          throw new Error(
            `Color ${item.colorId} not found for product ${item.productId}`
          );
        }

        // Verify size exists for the color and has sufficient stock
        const size = color.Sizes.find((s) => s.SizeId === item.sizeId);
        if (!size) {
          throw new Error(
            `Size ${item.sizeId} not found for color ${item.colorId}`
          );
        }

        if (!size.IsAvailable || size.Stock < item.quantity) {
          throw new Error(
            `Insufficient stock for product ${item.productId} in selected color and size`
          );
        }

        // Calculate the correct price
        const finalPrice = product.Base_price + size.PriceAdjustment;
        item.priceAtTime = finalPrice;

        // Add the item to the uniqueItems array
        uniqueItems.push(item);
      }
    }

    // Calculate total price
    for (const item of uniqueItems) {
      totalPrice += item.priceAtTime * item.quantity;
    }

    // Now update the user's cart in the database with the uniqueItems array
    for (const item of uniqueItems) {
      // Check if this cart item already exists in the database (for the current user)
      const existingCartItem = await prisma.cartItem.findFirst({
        where: {
          userId: data.UserId,
          productId: item.productId,
          colorId: item.colorId,
          sizeId: item.sizeId,
        },
      });

      if (existingCartItem) {
        // If item exists, update the quantity
        await prisma.cartItem.update({
          where: {
            id: existingCartItem.id,
          },
          data: {
            quantity: existingCartItem.quantity + item.quantity,
            priceAtTime: item.priceAtTime,
          },
        });
      } else {
        // If item does not exist, create a new cart item
        await prisma.cartItem.create({
          data: {
            userId: data.UserId,
            productId: item.productId,
            colorId: item.colorId,
            sizeId: item.sizeId,
            quantity: item.quantity,
            priceAtTime: item.priceAtTime,
          },
        });
      }
    }

    const cart = await prisma.user.findUnique({
      where: { UserId: data.UserId },
      select: { UserId: true, cartItems: true },
    });

    return { ...cart, totalPrice };
  }

  async deleteFromCart(userId: string, cartItemId?: string) {
    const deleteFromCart = await prisma.cartItem.delete({
      where: {
        id: cartItemId,
      },
    });
    if (!deleteFromCart) throw new Error("Cart item not found");
    return deleteFromCart;
  }

  async getCart(UserId: string) {
    const cart = await prisma.user.findUnique({
      where: {
        UserId: UserId,
      },
      select: {
        cartItems: {
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
        UserId: true,
      },
    });
    if (!cart) {
      return null;
    }

    const cartItemsWithDetails = cart.cartItems.map((item) => {
      // Calculate subTotal for this item
      const subTotal = item.quantity * item.priceAtTime;

      return {
        ...item,
        subTotal, // Add the subTotal field to each item
      };
    });

    // Calculate totalAmount for the cart (sum of all subtotals)
    const totalAmount = cartItemsWithDetails.reduce(
      (sum, item) => sum + item.subTotal,
      0
    );

    return {
      ...cart,
      cartItems: cartItemsWithDetails, // Include the cart items with the calculated subTotal
      totalAmount, // Return the totalAmount
    };
  }

  async updateCart(userId: string, cartItemId?: string, quantity?: number) {
    const updateCart = await prisma.cartItem.update({
      where: {
        id: cartItemId,
        userId: userId,
      },
      data: {
        quantity: quantity,
      },
    });
    if (!updateCart) throw new Error("Cart item not found");
    return updateCart;
  }
}
