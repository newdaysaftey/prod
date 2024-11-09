import { BaseService } from "@/app/api/services/base.service";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { v2 as cloudinary } from "cloudinary";
import { randomUUID } from "crypto";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface ProductData {
  Name: string;
  Description: string;
  ImageFile: File;
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

interface PaginationParams {
  page?: number;
  limit?: number;
  categoryId?: string;
  search?: string;
}

export class ProductService extends BaseService {
  private async uploadToCloudinary(
    buffer: Buffer,
    folder: string
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: `products/${folder}`,
          resource_type: "auto",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result!.secure_url);
        }
      );

      uploadStream.end(buffer);
    });
  }

  async createProduct(data: ProductData) {
    try {
      // Generate ProductId if not provided
      const productId = data.ProductId || randomUUID();

      // First, create/update the product without the image
      const product = await prisma.product.upsert({
        where: {
          ProductId: productId,
        },
        update: {
          Name: data.Name,
          Description: data.Description,
          Base_price: data.Base_price,
          Category: {
            connect: { CategoryId: data.CategoryId },
          },
          ModifiedAt: new Date(), // Add this if you want to track updates
        },
        create: {
          ProductId: productId,
          Name: data.Name,
          Description: data.Description,
          Base_price: data.Base_price,
          Category: {
            connect: { CategoryId: data.CategoryId },
          },
        },
      });

      // Then handle image upload if provided
      if (data.ImageFile) {
        try {
          // Convert File to Buffer
          const arrayBuffer = await data.ImageFile.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);

          // If there's an existing image, delete it from Cloudinary
          if (product.ImageUrl) {
            try {
              // Extract public_id from the existing URL
              const publicId = product.ImageUrl.split("/")
                .slice(-2)
                .join("/")
                .split(".")[0];
              await cloudinary.uploader.destroy(
                `products/${productId}/${publicId}`
              );
            } catch (error) {
              console.error("Error deleting old image:", error);
            }
          }

          // Upload new image to Cloudinary with the product ID in the folder structure
          const imageUrl = await this.uploadToCloudinary(
            buffer,
            `${productId}`
          );

          // Update the product with the new image URL
          const updatedProduct = await prisma.product.update({
            where: { ProductId: productId },
            data: {
              ImageUrl: imageUrl,
              ModifiedAt: new Date(),
            },
          });

          return updatedProduct;
        } catch (error) {
          console.error("Image upload failed:", error);
          // Return the product even if image upload fails
          return product;
        }
      }

      return product;
    } catch (error) {
      console.error("Product creation/update failed:", error);
      throw error;
    }
  }

  async addColorWithSizes(data: AddColorData) {
    if (!data.ProductId) {
      throw new Error("ProductId is required");
    }

    const createColors = await Promise.all(
      data.Colors.map(async (color) => {
        const uploadedImages: string[] = [];
        const existingColor = await prisma.color.findUnique({
          where: { ColorId: data.ColorId },
          select: { Images: true },
        });

        if (color.Images && color.Images.length > 0) {
          for (const imageUrl of color.Images) {
            try {
              if (imageUrl.startsWith("data:")) {
                // If updating, delete old images from Cloudinary
                if (existingColor && existingColor.Images.length > 0) {
                  for (const oldImage of existingColor.Images) {
                    try {
                      const publicId = oldImage
                        .split("/")
                        .slice(-2)
                        .join("/")
                        .split(".")[0];
                      await cloudinary.uploader.destroy(
                        `products/${data.ProductId}/colors/${publicId}`
                      );
                    } catch (error) {
                      console.error("Error deleting old color image:", error);
                    }
                  }
                }

                // Handle base64 image data
                const base64Data = imageUrl.split(",")[1];
                const buffer = Buffer.from(base64Data, "base64");

                const uploadedUrl = await this.uploadToCloudinary(
                  buffer,
                  `${data.ProductId}/colors/${color.ColorName}`
                );
                uploadedImages.push(uploadedUrl);
              } else {
                // Keep existing URLs
                uploadedImages.push(imageUrl);
              }
            } catch (error) {
              console.error(
                `Failed to upload image for color ${color.ColorName}:`,
                error
              );
              continue;
            }
          }
        }

        const colorId = data.ColorId || randomUUID();
        const createdColor = await prisma.color.upsert({
          where: {
            ColorId: colorId,
          },
          update: {
            ColorName: color.ColorName,
            ColorCode: color.ColorCode,
            Images: uploadedImages.length > 0 ? uploadedImages : undefined,
            Product: {
              connect: { ProductId: data.ProductId },
            },
            // : new Date(),
          },
          create: {
            ColorId: colorId,
            ColorName: color.ColorName,
            ColorCode: color.ColorCode,
            Images: uploadedImages,
            Product: {
              connect: { ProductId: data.ProductId },
            },
          },
        });

        const createdSizes = await Promise.all(
          color.Sizes.map(async (size) => {
            const sizeId = data.SizeId || randomUUID();
            return prisma.size.upsert({
              where: {
                SizeId: sizeId,
              },
              update: {
                Size: size.size,
                Stock: size.stock,
                PriceAdjustment: size.priceAdjustment,
                ColorId: createdColor.ColorId,
                // UpdatedAt: new Date(),
              },
              create: {
                SizeId: sizeId,
                Size: size.size,
                Stock: size.stock,
                PriceAdjustment: size.priceAdjustment,
                ColorId: createdColor.ColorId,
              },
            });
          })
        );

        return {
          Color: createdColor,
          Sizes: createdSizes,
        };
      })
    );

    return createColors;
  }

  async getProduct(params: PaginationParams = {}): Promise<any> {
    const page = params.page || 1;
    const limit = params.limit || 10;
    const skip = (page - 1) * limit;

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

    const totalItems = await prisma.product.count({
      where: whereClause,
    });

    const products = await prisma.product.findMany({
      where: whereClause,
      skip,
      take: limit,
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
        Tags: true,
        Colors: {
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
              },
            },
          },
        },
      },
      orderBy: {
        CreatedAt: "desc",
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

    const totalPages = Math.ceil(totalItems / limit);

    return {
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
  }

  async getProductById(ProductId: string) {
    return prisma.product.findUnique({
      where: {
        ProductId,
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
        Tags: true,
      },
    });
  }
}
