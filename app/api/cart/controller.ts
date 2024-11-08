import { BaseController } from "@/app/api/controllers/base.controller";
import { CartService } from "./service";

interface CartItemBody {
  ProductId: string;
  ColorId: string;
  SizeId: string;
  Quantity: number;
  PriceAtTime: number;
}

interface CartBody {
  UserId: string;
  Items: CartItemBody[];
}

export class CartController extends BaseController {
  [x: string]: any;
  private service: CartService;

  constructor() {
    super();
    this.service = new CartService();
  }

  async addtoCart(UserId: string, body: CartBody) {
    try {
      const { Items } = body as CartBody;
      if (!Items) {
        return this.sendError(new Error("Items is required"));
      }
      const category = await this.service.addtoCart({
        UserId,
        Items,
      });
      return this.sendSuccess(category, "Cart created successfully");
    } catch (error) {
      return this.sendError(error as Error);
    }
  }

  async getCart(UserId: string) {
    try {
      const category = await this.service.getCart(UserId);
      return this.sendSuccess(category, "Cart fetched successfully");
    } catch (error) {
      return this.sendError(error as Error);
    }
  }
}
