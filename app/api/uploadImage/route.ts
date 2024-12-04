import { NextRequest } from "next/server";
import { ImageController } from "./controller";

export const dynamic = "force-dynamic";
const controller = new ImageController();

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("ImageFile") as File;
    return controller.uploadImage(file);
  } catch (error) {
    return Response.json(
      {
        error: true,
        message: "Failed to process request",
        data: error,
      },
      { status: 500 }
    );
  }
}
