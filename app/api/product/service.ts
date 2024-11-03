// services/signup.service.ts
import { BaseService } from "@/app/api/services/base.service";
import prisma from "@/lib/prisma";

interface ProductData {
  Name: string;
  About: string;
  ImageUrl: string;
  Cost: any;
  CategoryId: string;
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
  Colors: ColorData[];
}

export class ProductService extends BaseService {
  async createProduct(data: ProductData) {
    const product = await prisma.product.create({
      data: {
        Name: data.Name,
        About: data.About,
        Cost: data.Cost,
        ImageUrl: data.ImageUrl,
        Category: {
          connect: { CategoryId: data.CategoryId }, // Connects existing category
        },
      },
      select: {
        ProductId: true,
        Name: true,
        CategoryId: true,
      },
    });
    return product;
  }

  async addColortoProduct(data: AddColorData) {
    const createColors = await Promise.all(
      data.Colors.map((color) =>
        prisma.color.create({
          data: {
            ColorName: color.ColorName,
            ColorCode: color.ColorCode,
            Images: color.Images,
            Product: {
              connect: { ProductId: data.ProductId },
            },
          },
        })
      )
    );

    return createColors;
  }

  async addColorWithSizes(data: AddColorData) {
    const createColors = await Promise.all(
      data.Colors.map(async (color) => {
        const createdColor = await prisma.color.create({
          data: {
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
            prisma.size.create({
              data: {
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
  }

  async getProduct() {
    const products = await prisma.product.findMany({
      where: {
        Deleted: false,
      },
      select: {
        ProductId: true,
        Name: true,
        About: true,
        Cost: true,
        Category: {
          select: {
            CategoryId: true,
            Name: true,
          },
        },
        Colors: {
          select: {
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
        About: product.About,
        Cost: product.Cost,
        Colors: product.Colors,
      });
      return acc;
    }, {} as Record<string, any>);

    // Convert the grouped object to an array
    return Object.values(groupedByCategory);

    // return products;
  }
}
