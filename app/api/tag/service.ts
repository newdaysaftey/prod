//
import { BaseService } from "@/app/api/services/base.service";
import prisma from "@/lib/prisma";

export class TagService extends BaseService {
  async createTag(name: string, startDate?: Date, endDate?: Date) {
    const tag = await prisma.tag.create({
      data: {
        name: name,
        startDate: startDate,
        endDate: endDate,
      },
    });
    return tag;
  }

  async addProductsToTag(tagId: string, productIds: string[]) {
    const upsertOperations = productIds.map((productId) =>
      prisma.productToTag.upsert({
        where: {
          productId_tagId: {
            productId,
            tagId,
          },
        },
        update: {}, // No updates needed since relation exists
        create: {
          productId,
          tagId,
        },
      })
    );
    await this.syncProductsToTag(tagId, productIds);
    return await prisma.$transaction(upsertOperations);
  }

  async syncProductsToTag(tagId: string, productIds: string[]) {
    // Get existing product-tag relationships
    const existingProducts = await prisma.productToTag.findMany({
      where: { tagId },
      select: { productId: true },
    });
    const existingProductIds = existingProducts.map((p) => p.productId);

    // Find products to remove and add
    const productsToRemove = existingProductIds.filter(
      (id) => !productIds.includes(id)
    );
    const productsToAdd = productIds.filter(
      (id) => !existingProductIds.includes(id)
    );

    return await prisma.$transaction([
      // Remove products not in new list
      prisma.productToTag.deleteMany({
        where: {
          tagId,
          productId: { in: productsToRemove },
        },
      }),
      // Add new products
      ...productsToAdd.map((productId) =>
        prisma.productToTag.create({
          data: { tagId, productId },
        })
      ),
    ]);
  }

  async getTags() {
    const tags = await prisma.tag.findMany({
      include: {
        products: {
          include: {
            product: {
              include: {
                Colors: {
                  include: {
                    Sizes: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    return tags;
  }
}
