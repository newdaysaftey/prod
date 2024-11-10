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
    const ImageFile = formData.get("ImageFile") as File;

    return controller.uploadImage(ImageFile);
  } catch (error) {
    return Response.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
