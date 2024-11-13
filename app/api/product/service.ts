//
import { BaseService } from "@/app/api/services/base.service";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

interface ProductData {
  Name: string;
  Description: string;
  ImageUrl: string;
  Base_price: any;
  CategoryId: string;
  ProductId: string;
}

interface SizeInput {
  Size: string;
  Stock: number;
  SizeId: string;
  PriceAdjustment: number;
  sku: string;
  isDeleted?: boolean;
}

interface ColorData {
  ColorId: string;
  isDeleted?: boolean;
  ColorName: string;
  ColorCode: string;
  Images: string[];
  Sizes: SizeInput[];
}

interface AddColorData {
  ProductId: string;
  Colors: ColorData[];
}

interface PaginationParams {
  page?: number;
  limit?: number;
  categoryId?: string;
  search?: string;
}

interface PaginatedResponse {
  data: any[];
  metadata: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
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
    // if (data.ColorId || data.ProductId) {
    const createColors = await Promise.all(
      data.Colors.map(async (color) => {
        const createdColor = await prisma.color.upsert({
          where: {
            ColorId: color.ColorId,
          },
          update: {
            ColorName: color.ColorName,
            ColorCode: color.ColorCode,
            Images: color.Images,
            Product: {
              connect: { ProductId: data.ProductId },
            },
            isDeleted: color.isDeleted,
          },
          create: {
            ColorName: color.ColorName,
            ColorCode: color.ColorCode,
            Images: color.Images,
            Product: {
              connect: { ProductId: data.ProductId },
            },
            // isDeleted: color.isDeleted,
          },
        });

        const createdSizes = await Promise.all(
          color.Sizes.map((size) =>
            prisma.size.upsert({
              where: {
                SizeId: size.SizeId,
              },
              update: {
                Size: size.Size,
                Stock: size.Stock,
                PriceAdjustment: size.PriceAdjustment,
                ColorId: createdColor.ColorId,
                isDeleted: size.isDeleted,
              },
              create: {
                Size: size.Size,
                Stock: size.Stock,
                PriceAdjustment: size.PriceAdjustment,
                ColorId: createdColor.ColorId,
                // isDeleted: size.isDeleted
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
    // }
    // else {
    //   return "Error in creating/updating the color's and size's";
    // }

    // return createColors;
  }

  async getProduct(params: PaginationParams = {}): Promise<PaginatedResponse> {
    const page = params.page || 1;
    const limit = params.limit || 10;
    const skip = (page - 1) * limit;

    // Base where clause
    const whereClause = {
      IsDeleted: false,
      IsActive: true,
      ...(params.categoryId && { CategoryId: params.categoryId }),
      ...(params.search && {
        Tags: {
          contains: params.search,
          mode: "insensitive" as Prisma.QueryMode, // Correct type for case-insensitive search
        },
      }),
    };

    // Get total count for pagination
    const totalItems = await prisma.product.count({
      where: whereClause,
    });

    // Get paginated products
    const products = await prisma.product.findMany({
      where: whereClause,
      skip,
      take: limit,
      select: {
        ProductId: true,
        Name: true,
        Description: true,
        Base_price: true,
        Tags: true,
        Category: {
          select: {
            CategoryId: true,
            Name: true,
          },
        },
        Colors: {
          where: {
            isDeleted: false,
          },
          select: {
            ColorId: true,
            ColorName: true,
            ColorCode: true,
            Images: true,
            Sizes: {
              select: {
                SizeId: true,
                Size: true,
                Stock: true,
                PriceAdjustment: true,
                IsAvailable: true,
                isDeleted: true,
              },
            },
          },
        },
      },
      orderBy: {
        CreatedAt: "desc", // Most recent first
      },
    });

    // Group by category
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
        Tags: product.Tags,
        Colors: product.Colors.map((color) => ({
          ...color,
          Sizes: color.Sizes.filter(
            (size) => size.IsAvailable && size.Stock > 0
          ),
        })),
      });
      return acc;
    }, {} as Record<string, any>);

    // Calculate pagination metadata
    const totalPages = Math.ceil(totalItems / limit);

    // Prepare paginated response
    const paginatedResponse: PaginatedResponse = {
      data: Object.values(groupedByCategory),
      metadata: {
        currentPage: page,
        totalPages,
        totalItems,
        itemsPerPage: limit,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    };

    return paginatedResponse;
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
