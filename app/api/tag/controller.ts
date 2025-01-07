import { BaseController } from "@/app/api/controllers/base.controller";
import { TagService } from "./service";
import { NextRequest } from "next/server";
import { Size } from "@prisma/client";

export class TagController extends BaseController {
  [x: string]: any;
  private service: TagService;

  constructor() {
    super();
    this.service = new TagService();
  }

  async createTag(name: string, startDate?: Date, endDate?: Date) {
    try {
      const tags = await this.service.createTag(name, startDate, endDate);
      return this.sendSuccess(tags, "Tag created sucessfully");
    } catch (error) {
      return this.sendError(error as Error);
    }
  }

  async addProductsToTag(tagId: string, productIds: string[]) {
    try {
      const tags = await this.service.addProductsToTag(tagId, productIds);
      return this.sendSuccess(tags, "Tag created sucessfully");
    } catch (error) {
      return this.sendError(error as Error);
    }
  }

  async getTags() {
    try {
      const tags = await this.service.getTags();
      return this.sendSuccess(tags, "Tag fetched sucessfully");
    } catch (error) {
      return this.sendError(error as Error);
    }
  }

  async deleteTag(request: NextRequest) {
    try {
      const searchParams = request.nextUrl.searchParams;
      const tagId = searchParams.get("tagId") || undefined;
      const tag = await this.service.deleteTag(tagId);
      return this.sendSuccess(tag, "tag deleted successfully");
    } catch (error) {
      return this.sendError(error as Error);
    }
  }
}
