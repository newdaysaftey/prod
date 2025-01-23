//
import { BaseService } from "@/app/api/services/base.service";
import prisma from "@/lib/prisma";

interface CategoryData {
  Name: string;
}

interface CategoryWithSequence {
  CategoryId: string;
  sequence: number;
}

export class CategoryService extends BaseService {
  async createCategory(data: CategoryData) {
    const category = await prisma.category.create({
      data: {
        Name: data.Name,
      },
    });
    return category;
  }

  async getCategory() {
    const category = await prisma.category.findMany({
      where: {
        IsDeleted: false,
      },
      select: {
        CategoryId: true,
        Name: true,
        Sequence: true,
      },
      orderBy: {
        Sequence: "asc",
      },
    });
    return category;
  }

  async deleteFromCategory(categoryId?: string) {
    const category = await prisma.category.update({
      where: {
        CategoryId: categoryId,
      },
      data: { IsDeleted: true },
      select: {
        CategoryId: true,
        Name: true,
        Sequence: true,
      },
    });
    return category;
  }

  async updateCategorySequence(categories: CategoryWithSequence[]) {
    try {
      const updates = categories.map(({ CategoryId, sequence }) =>
        prisma.category.update({
          where: { CategoryId },
          data: {
            Sequence: sequence,
            ModifiedOn: new Date(),
          },
        })
      );

      return await prisma.$transaction(updates);
    } catch (error) {
      console.error("Error updating category sequence:", error);
      throw error;
    }
  }

  async updateCategory(categoryId?: string, name?: string) {
    const category = await prisma.category.update({
      where: {
        CategoryId: categoryId,
      },
      data: { Name: name },
      select: {
        CategoryId: true,
        Name: true,
        Sequence: true,
      },
    });
    return category;
  }
}
