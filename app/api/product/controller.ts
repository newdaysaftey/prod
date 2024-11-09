import { BaseController } from "@/app/api/controllers/base.controller";
import { ProductService } from "./service";
import { NextRequest } from "next/server";

interface SizeInput {
  size: string;
  stock: number;
  priceAdjustment: number;
  sku: string;
}

interface ColorBody {
  ColorName: string;
  ColorCode: string;
  Images: string[];
  Sizes: SizeInput[];
}

interface ProductBody {
  step: number;
  Name: string;
  Description: string;
  ImageFile: File;
  Base_price: any;
  CategoryId: string;
  ColorId: string;
  SizeId: string;
  ProductId: string;
  Colors: ColorBody[];
}

export class ProductController extends BaseController {
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
        ImageFile,
        Base_price,
        CategoryId,
        ProductId,
        ColorId,
        SizeId,
        Colors,
      } = body;

      if (step === 1) {
        const productData = {
          Name,
          Description,
          ImageFile,
          Base_price,
          CategoryId,
          ProductId,
        };

        const product = await this.service.createProduct(productData);
        return this.sendSuccess(
          product,
          "Product created/updated successfully"
        );
      } else if (step === 2) {
        const colorData = {
          ProductId,
          Colors,
          ColorId,
          SizeId,
        };

        const sizes = await this.service.addColorWithSizes(colorData);
        return this.sendSuccess(sizes, "Added colors & sizes to the product");
      }

      return this.sendError("Step is required");
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

      if (page < 1 || limit < 1 || limit > 100) {
        return this.sendError("Invalid pagination parameters");
      }

      const products = await this.service.getProduct({
        page,
        limit,
        categoryId,
        search,
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
}
