import { NextRequest } from "next/server";
import { CategoryController } from "./controller";
export const dynamic = "dynamic";
const controller = new CategoryController();

export async function POST(request: NextRequest) {
  const body = await request.json();
  return controller.createCategory(body);
}

export async function GET(request: NextRequest) {
  return controller.getCategory();
}
