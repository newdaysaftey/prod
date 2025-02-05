import { BaseController } from "@/app/api/controllers/base.controller";
import { ProductService } from "./service";
import { NextRequest } from "next/server";
import { Size } from "@prisma/client";
import { productType } from "@/lib/enum";

interface ColorBody {
  ColorId: string;
  isDeleted?: boolean;
  ColorName: string;
  ColorCode: string;
  Images: string[];
  Sizes: Size[];
}

interface ProductBody {
  step: number;
  Name: string;
  Description: string;
  ImageUrl: string;
  Base_price: any;
  CategoryId: string;
  ProductId: string;
  Colors: ColorBody[];
  ProductType: productType;
}

export class ProductController extends BaseController {
  [x: string]: any;
  private service: ProductService;

  constructor() {
    super();
    this.service = new ProductService();
  }

  async createProduct(body: ProductBody) {
    try {
      const {
        step,
        Name,
        Description,
        ImageUrl,
        Base_price,
        CategoryId,
        ProductId,
        Colors,
        ProductType,
      } = body as ProductBody;
      if (step === 1) {
        const category = await this.service.createProduct({
          Name,
          Description,
          ImageUrl,
          Base_price,
          CategoryId,
          ProductId,
          ProductType,
        });
        return this.sendSuccess(
          category,
          "Product created/updated successfully"
        );
      } else if (step === 2) {
        const sizes = await this.service.addColorWithSizes({
          ProductId,
          Colors,
        });
        return this.sendSuccess(sizes, "added colors & sizes to the product");
      }
      return this.sendError("step is required");
    } catch (error) {
      return this.sendError(error as Error);
    }
  }

  async getProduct(request: NextRequest) {
    try {
      const searchParams = request.nextUrl.searchParams;
      const page = parseInt(searchParams.get("page") || "1");
      const limit = parseInt(searchParams.get("limit") || "10");
      const categoryId = searchParams.get("categoryId") || undefined;
      const search = searchParams.get("search") || undefined;
      const tagsBoolean = searchParams.get("tags");
      const tags =
        tagsBoolean === "true"
          ? true
          : tagsBoolean === "false"
          ? false
          : undefined;

      // Validate pagination parameters
      if (page < 1 || limit < 1 || limit > 100) {
        return this.sendError("Invalid pagination parameters");
      }

      const products = await this.service.getProduct({
        page,
        limit,
        categoryId,
        search,
        tags,
      });
      return this.sendSuccess(products, "Products fetched successfully");
    } catch (error) {
      return this.sendError(error as Error);
    }
  }

  async getProductById(ProductId: string) {
    try {
      const products = await this.service.getProductById(ProductId);
      return this.sendSuccess(products, "Product fetched successfully");
    } catch (error) {
      return this.sendError(error as Error);
    }
  }

  async deleteProduct(request: NextRequest) {
    try {
      const searchParams = request.nextUrl.searchParams;
      const productId = searchParams.get("productId") || undefined;
      const product = await this.service.deleteProduct(productId);
      return this.sendSuccess(product, "product deleted successfully");
    } catch (error) {
      return this.sendError(error as Error);
    }
  }

  async deleteColorVarient(request: NextRequest) {
    try {
      const body = await request.json();
      const productId = body.productId;
      const colorId = body.colorId;
      if (!colorId || !productId) {
        return this.sendError("Body is invalid");
      }
      const product = await this.service.deleteColorVarient(productId, colorId);
      return this.sendSuccess(product, "product deleted successfully");
    } catch (error) {
      return this.sendError(error as Error);
    }
  }
}
