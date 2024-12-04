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
}
