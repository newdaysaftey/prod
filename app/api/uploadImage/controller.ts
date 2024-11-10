import { BaseController } from "@/app/api/controllers/base.controller";
import { ImageService } from "./service";
import { NextRequest } from "next/server";

export class ImageController extends BaseController {
  [x: string]: any;
  private service: ImageService;

  constructor() {
    super();
    this.service = new ImageService();
  }

  async uploadImage(ImageFile: File) {
    try {
      if (!ImageFile) {
        return this.sendError(new Error("ImageFile is required"));
      }

      const arrayBuffer = await ImageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      // const fileBuffer = await this.convertFileToBuffer(ImageFile);
      // console.log(fileBuffer);
      const image = await this.service.uploadImage({
        file: buffer,
        folder: "Product_images",
      });
      return this.sendSuccess(image, "image uploaded successfully");
    } catch (error) {
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
