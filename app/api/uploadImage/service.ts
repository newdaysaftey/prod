import { BaseService } from "@/app/api/services/base.service";
import { v2 as cloudinary } from "cloudinary";
import { randomUUID } from "crypto";
import { UploadImageParams, CloudinaryResponse } from "@/app/types/global";

export class ImageService extends BaseService {
  constructor() {
    super();
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }
  private async uploadToCloudinary(
    buffer: Buffer,
    fileName: string,
    folder: string
  ): Promise<CloudinaryResponse> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: `products/${folder}`,
          resource_type: "image",
          public_id: fileName,
        },
        (error, result) =>
          error ? reject(error) : resolve(result as CloudinaryResponse)
      );
      uploadStream.end(buffer);
    });
  }
  async uploadImage({ file, folder }: UploadImageParams): Promise<string> {
    try {
      const { buffer, extension } = await this.processFile(file);
      const fileName = `${randomUUID()}-${Date.now()}.${extension}`;
      const result = await this.uploadToCloudinary(buffer, fileName, folder);
      return result.secure_url;
    } catch (error) {
      throw new Error(`Image upload failed: ${(error as Error).message}`);
    }
  }

  private processFile(file: Buffer | string): {
    buffer: Buffer;
    extension: string;
  } {
    if (typeof file === "string" && file.startsWith("data:")) {
      const [mimeInfo, base64Data] = file.split(",");
      const extension = mimeInfo.split(":")[1].split("/")[1].split(";")[0];
      return {
        buffer: Buffer.from(base64Data, "base64"),
        extension,
      };
    }
    return {
      buffer: file as Buffer,
      extension: "jpg",
    };
  }
}
