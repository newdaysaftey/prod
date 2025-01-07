//
import { BaseService } from "@/app/api/services/base.service";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";
import { Role } from "@/lib/enum";

interface CategoryData {
  Name: string;
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
      },
    });
    return category;
  }
}
