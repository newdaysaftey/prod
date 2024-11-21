import { NextRequest } from "next/server";
import { ProductController } from "../controller";

export const dynamic = "auto";
const controller = new ProductController();

export async function GET(
  request: NextRequest,
  { params }: { params: { ProductId: string } }
) {
  return controller.getProductById(params.ProductId);
}
