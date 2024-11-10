import { NextRequest } from "next/server";

export async function processFormData(request: NextRequest): Promise<FormData> {
  if (!request.headers.get("content-type")?.includes("multipart/form-data")) {
    throw new Error("Content type must be multipart/form-data");
  }

  try {
    const formData = await request.formData();
    return formData;
  } catch (error) {
    console.error("Error processing form data:", error);
    throw new Error("Failed to process form data");
  }
}
