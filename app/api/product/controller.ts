import { BaseController } from "@/app/api/controllers/base.controller";
import { ProductService } from "./service";

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
  ImageUrl: string;
  Base_price: any;
  CategoryId: string;
  ColorId: string;
  SizeId: string;
  ProductId: string;
  Colors: ColorBody[];
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
        ColorId,
        SizeId,
        Colors,
      } = body as ProductBody;
      if (step === 1) {
        const category = await this.service.createProduct({
          Name,
          Description,
          ImageUrl,
          Base_price,
          CategoryId,
          ProductId,
        });
        return this.sendSuccess(
          category,
          "Product created/updated successfully"
        );
      } else if (step === 2) {
        const sizes = await this.service.addColorWithSizes({
          ProductId,
          Colors,
          ColorId,
          SizeId,
        });
        return this.sendSuccess(sizes, "added colors & sizes to the product");
      }
      return this.sendError("step is required");
    } catch (error) {
      return this.sendError(error as Error);
    }
  }

  async getProduct() {
    try {
      const products = await this.service.getProduct();
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
