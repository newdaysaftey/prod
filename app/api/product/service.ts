// services/signup.service.ts
import { BaseService } from "@/app/api/services/base.service";
import prisma from "@/lib/prisma";

interface ProductData {
  Name: string;
  Description: string;
  ImageUrl: string;
  Base_price: any;
  CategoryId: string;
  ProductId: string;
}

interface SizeInput {
  size: string;
  stock: number;
  priceAdjustment: number;
  sku: string;
}

interface ColorData {
  ColorName: string;
  ColorCode: string;
  Images: string[];
  Sizes: SizeInput[];
}

interface AddColorData {
  ProductId: string;
  ColorId: string;
  SizeId: string;
  Colors: ColorData[];
}

export class ProductService extends BaseService {
  async createProduct(data: ProductData) {
    const product = await prisma.product.upsert({
      where: {
        ProductId: data.ProductId,
      },
      update: {
        Name: data.Name,
        Description: data.Description,
        Base_price: data.Base_price,
        ImageUrl: data.ImageUrl,
        Category: {
          connect: { CategoryId: data.CategoryId }, // Connects existing category
        },
      },
      create: {
        Name: data.Name,
        Description: data.Description,
        Base_price: data.Base_price,
        ImageUrl: data.ImageUrl,
        Category: {
          connect: { CategoryId: data.CategoryId }, // Connects existing category
        },
      },
    });
    return product;
  }

  async addColorWithSizes(data: AddColorData) {
    if (data.ColorId || data.ProductId) {
      const createColors = await Promise.all(
        data.Colors.map(async (color) => {
          const createdColor = await prisma.color.upsert({
            where: {
              ColorId: data.ColorId,
            },
            update: {
              ColorName: color.ColorName,
              ColorCode: color.ColorCode,
              Images: color.Images,
              Product: {
                connect: { ProductId: data.ProductId },
              },
            },
            create: {
              ColorName: color.ColorName,
              ColorCode: color.ColorCode,
              Images: color.Images,
              Product: {
                connect: { ProductId: data.ProductId },
              },
            },
          });

          const createdSizes = await Promise.all(
            color.Sizes.map((size) =>
              prisma.size.upsert({
                where: {
                  SizeId: data.SizeId,
                },
                update: {
                  Size: size.size,
                  Stock: size.stock,
                  PriceAdjustment: size.priceAdjustment,
                  ColorId: createdColor.ColorId,
                },
                create: {
                  Size: size.size,
                  Stock: size.stock,
                  PriceAdjustment: size.priceAdjustment,
                  ColorId: createdColor.ColorId,
                },
              })
            )
          );

          return {
            Color: createdColor,
            Sizes: createdSizes,
          };
        })
      );
      return createColors;
    } else {
      return "Error in creating/updating the color's and size's";
    }

    // return createColors;
  }

  async getProduct() {
    const products = await prisma.product.findMany({
      where: {
        IsDeleted: false,
        IsActive: true,
      },
      select: {
        ProductId: true,
        Name: true,
        Description: true,
        Base_price: true,
        Category: {
          select: {
            CategoryId: true,
            Name: true,
          },
        },
        Colors: {
          select: {
            ColorId: true,
            ColorName: true,
            ColorCode: true,
            Images: true,
            Sizes: true,
          },
        },
      },
    });

    const groupedByCategory = products.reduce((acc, product) => {
      const categoryId = product.Category.CategoryId;
      if (!acc[categoryId]) {
        acc[categoryId] = {
          ...product.Category,
          Products: [],
        };
      }
      acc[categoryId].Products.push({
        ProductId: product.ProductId,
        Name: product.Name,
        Description: product.Description,
        Base_price: product.Base_price,
        Colors: product.Colors,
      });
      return acc;
    }, {} as Record<string, any>);

    // Convert the grouped object to an array
    return Object.values(groupedByCategory);

    // return products;
  }

  async getProductById(ProductId: string) {
    const product = await prisma.product.findUnique({
      where: {
        ProductId: ProductId,
        IsDeleted: false,
        IsActive: true,
      },
      select: {
        ProductId: true,
        Name: true,
        Description: true,
        Base_price: true,
        Category: {
          select: {
            CategoryId: true,
            Name: true,
          },
        },
        Colors: {
          select: {
            ColorId: true,
            ColorName: true,
            ColorCode: true,
            Images: true,
            Sizes: true,
          },
        },
      },
    });

    return product;
  }
}
