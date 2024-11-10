import { BaseService } from "@/app/api/services/base.service";
import { v2 as cloudinary } from "cloudinary";
import { randomUUID } from "crypto";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface UploadImageParams {
  file: Buffer | string;
  folder: string;
  resourceType?: string;
}

export class ImageService extends BaseService {
  async uploadImage({ file, folder }: UploadImageParams): Promise<string> {
    try {
      let buffer: Buffer;
      let fileName: string;

      // Handle base64 strings
      if (typeof file === "string" && file.startsWith("data:")) {
        const base64Data = file.split(",")[1];
        buffer = Buffer.from(base64Data, "base64");

        // Extract the file extension (e.g., jpg, png, etc.) from the base64 string
        const mimeType = file.split(";")[0].split(":")[1];
        const extension = mimeType.split("/")[1];
        fileName = `${randomUUID()}-${Date.now()}.${extension}`;
      } else {
        buffer = file as Buffer;

        // Extract file name and extension from the Buffer's file name or URL
        const extension = "jpg"; // You can set a default extension here
        fileName = `${randomUUID()}-${Date.now()}.${extension}`;
      }

      const uploadResult = await new Promise<any>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: `products/${folder}`,
            resource_type: "image",
            public_id: `${fileName}`, // Set the custom filename with timestamp
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );

        uploadStream.end(buffer);
      });

      return uploadResult.secure_url;
    } catch (error) {
      console.error("Image upload failed:", error);
      throw new Error("Failed to upload image");
    }
  }
}
