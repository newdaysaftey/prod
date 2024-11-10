import { NextRequest } from "next/server";
import { ProductController } from "./controller";
export const dynamic = "dynamic";
const controller = new ProductController();

export async function POST(request: NextRequest) {
  const body = await request.json();
  return controller.createProduct(body);
}

export async function GET(request: NextRequest) {
  return controller.getProduct(request);
}
