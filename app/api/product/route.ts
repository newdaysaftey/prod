import { NextRequest } from "next/server";
import { ProductController } from "./controller";
import { processFormData } from "@/lib/multer-config";
export const dynamic = "dynamic";
const controller = new ProductController();

export async function POST(request: NextRequest) {
  try {
    // Process the multipart form data
    const formData = await processFormData(request);

    // Parse the formData into the expected format
    const body = {
      step: parseInt(formData.get("step") as string),
      Name: formData.get("Name") as string,
      Description: formData.get("Description") as string,
      Base_price: parseFloat(formData.get("Base_price") as string),
      CategoryId: formData.get("CategoryId") as string,
      ProductId: formData.get("ProductId") as string,
      ColorId: formData.get("ColorId") as string,
      SizeId: formData.get("SizeId") as string,
      ImageFile: formData.get("ImageFile") as File,
      Colors: formData.get("Colors")
        ? JSON.parse(formData.get("Colors") as string)
        : [],
    };

    return controller.createProduct(body);
  } catch (error) {
    return Response.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  return controller.getProduct(request);
}
