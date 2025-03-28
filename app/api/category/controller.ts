import { BaseController } from "@/app/api/controllers/base.controller";
import { CategoryService } from "./service";
import { NextRequest } from "next/server";

interface CategoryBody {
  Name: string;
}

export class CategoryController extends BaseController {
  [x: string]: any;
  private service: CategoryService;

  constructor() {
    super();
    this.service = new CategoryService();
  }

  async createCategory(body: CategoryBody) {
    try {
      const { Name } = body as CategoryBody;
      if (!Name) {
        return this.sendError(new Error("Name is required"));
      }
      const category = await this.service.createCategory({
        Name,
      });
      return this.sendSuccess(category, "Category created successfully");
    } catch (error) {
      return this.sendError(error as Error);
    }
  }

  async getCategory() {
    try {
      const category = await this.service.getCategory();
      return this.sendSuccess(category, "Categories fetched successfully");
    } catch (error) {
      return this.sendError(error as Error);
    }
  }

  async deleteCategory(request: NextRequest) {
    try {
      const searchParams = request.nextUrl.searchParams;
      const categoryId = searchParams.get("categoryId") || undefined;
      const category = await this.service.deleteFromCategory(categoryId);
      return this.sendSuccess(category, "Category deleted successfully");
    } catch (error) {
      return this.sendError(error as Error);
    }
  }

  async updateSequence(request: NextRequest) {
    try {
      const body = await request.json();
      const categories = body.categories;

      if (!Array.isArray(categories)) {
        return this.sendError("Invalid request format");
      }

      const result = await this.service.updateCategorySequence(categories);
      return this.sendSuccess(result, "sequence updated successfully");
    } catch (error) {
      console.error("Error updating sequence:", error);
      return this.sendError(error as Error);
    }
  }

  async updateCategory(request: NextRequest) {
    try {
      const body = await request.json();
      const categoryId = body.categoryId;
      const name = body.name;
      if (!categoryId || !name) {
        console.log(categoryId, name);
        return this.sendError("Body is invalid");
      }
      const result = await this.service.updateCategory(categoryId, name);
      return this.sendSuccess(result, "category updated successfully");
    } catch (error) {
      console.error("Error updating sequence:", error);
      return this.sendError(error as Error);
    }
  }
}
