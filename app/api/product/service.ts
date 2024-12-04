//
import { BaseService } from "@/app/api/services/base.service";
import prisma from "@/lib/prisma";
import { Prisma, Size } from "@prisma/client";

interface ProductData {
  Name: string;
  Description: string;
  ImageUrl: string;
  Base_price: any;
  CategoryId: string;
  ProductId: string;
}

interface ColorData {
  ColorId: string;
  isDeleted?: boolean;
  ColorName: string;
  ColorCode: string;
  Images: string[];
  Sizes: Size[];
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
  tags?: boolean;
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
    const product = await prisma.product.findUnique({
      where: { ProductId: data.ProductId },
    });

    if (!product) {
      throw new Error("Product not found");
    }
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

  async getProduct(params: PaginationParams) {
    const page = params.page || 1;
    const limit = params.limit || 10;
    const skip = (page - 1) * limit;
    const tags = params.tags;

    // Base where clause
    const whereClause: Prisma.ProductWhereInput = {
      IsDeleted: false,
      IsActive: true,
      ...(params.categoryId && { CategoryId: params.categoryId }),
      ...(tags && {
        Tags: {
          some: {
            tag: {
              isActive: true,
              OR: [{ endDate: null }, { endDate: { gt: new Date() } }],
            },
          },
        },
      }),
      ...(params.search && {
        OR: [
          {
            Tags: {
              some: {
                tag: {
                  name: { contains: params.search, mode: "insensitive" },
                },
              },
            },
          },
          { Name: { contains: params.search, mode: "insensitive" } },
          { Description: { contains: params.search, mode: "insensitive" } },
        ],
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
        Tags: {
          select: {
            tag: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        ImageUrl: true,
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

    let groupedByTagsOrCategory;

    if (tags) {
      // Group by Tags if the 'tags' param is true
      groupedByTagsOrCategory = products.reduce((acc, product) => {
        const productTags = product.Tags.map((pt) => pt.tag.name);
        productTags.forEach((tagName) => {
          if (!acc[tagName]) {
            acc[tagName] = {
              tagName,
              Products: [],
            };
          }
          acc[tagName].Products.push({
            ProductId: product.ProductId,
            Name: product.Name,
            Description: product.Description,
            Base_price: product.Base_price,
            Tags: product.Tags,
            ImageUrl: product.ImageUrl,
            Colors: product.Colors.map((color) => ({
              ...color,
              Sizes: color.Sizes.filter(
                (size) => size.IsAvailable && size.Stock > 0
              ),
            })),
          });
        });
        return acc;
      }, {} as Record<string, any>);
    } else {
      // Group by Category if 'tags' param is false (default behavior)
      groupedByTagsOrCategory = products.reduce((acc, product) => {
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
          ImageUrl: product.ImageUrl,
          Colors: product.Colors.map((color) => ({
            ...color,
            Sizes: color.Sizes.filter(
              (size) => size.IsAvailable && size.Stock > 0
            ),
          })),
        });
        return acc;
      }, {} as Record<string, any>);
    }

    // Calculate pagination metadata
    const totalPages = Math.ceil(totalItems / limit);

    // Prepare paginated response
    const paginatedResponse: PaginatedResponse = {
      data: Object.values(groupedByTagsOrCategory),
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
