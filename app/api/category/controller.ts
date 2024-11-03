import { BaseController } from "@/app/api/controllers/base.controller";
import { CategoryService } from "./service";

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
}
