import { NextRequest } from "next/server";
import { ImageController } from "./controller";
import { processFormData } from "@/lib/multer-config";
export const dynamic = "dynamic";
const controller = new ImageController();

export async function POST(request: NextRequest) {
  try {
    // Process the multipart form data
    const formData = await processFormData(request);
    // Parse the formData into the expected format
    const ImageFile = formData.getAll("ImageFile") as File[];

    return controller.uploadMultipleImages(ImageFile);
  } catch (error) {
    return Response.json({
      error: true,
      message: "Failed to process request",
      data: error,
    });
  }
}
