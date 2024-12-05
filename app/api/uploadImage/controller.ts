import { BaseController } from "@/app/api/controllers/base.controller";
import { ImageService } from "./service";

export class ImageController extends BaseController {
  private service: ImageService;

  constructor() {
    super();
    this.service = new ImageService();
  }

  async uploadImage(file: File) {
    try {
      if (!file) {
        return this.sendError(new Error("File is required"));
      }

      const buffer = Buffer.from(await file.arrayBuffer());
      const imageUrl = await this.service.uploadImage({
        file: buffer,
        folder: "Product_images",
      });

      return this.sendSuccess(imageUrl, "Image uploaded successfully");
    } catch (error) {
      console.error(error);
      return this.sendError(error as Error);
    }
  }

  async uploadMultipleImages(imageFiles: File[]) {
    try {
      if (!imageFiles || imageFiles.length === 0) {
        return this.sendError(new Error("At least one image file is required"));
      }

      // Convert all files to buffers
      const buffers = await Promise.all(
        imageFiles.map(async (file) => {
          const arrayBuffer = await file.arrayBuffer();
          return Buffer.from(arrayBuffer);
        })
      );

      const images = await this.service.uploadMultipleImages({
        files: buffers,
        folder: "Product_images",
      });

      return this.sendSuccess(images, "Images uploaded successfully");
    } catch (error) {
      console.log(error);
      return this.sendError(error as Error);
    }
  }

  // private async convertFileToBuffer(file: File): Promise<Buffer> {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();

  //     reader.onloadend = () => {
  //       // The result is a base64 string
  //       const buffer = Buffer.from(reader.result as ArrayBuffer);
  //       resolve(buffer);
  //     };

  //     reader.onerror = reject;

  //     reader.readAsArrayBuffer(file); // Convert File object to ArrayBuffer
  //   });
  // }
}
