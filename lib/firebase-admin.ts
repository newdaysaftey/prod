import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";

if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  });
}

const bucket = getStorage().bucket();

export class FirebaseAdminService {
  private static readonly PRODUCT_IMAGES_PATH = "product-images";

  static async uploadBuffer(
    buffer: Buffer,
    fileName: string,
    mimeType: string,
    productId: string
  ): Promise<string> {
    const filePath = `${this.PRODUCT_IMAGES_PATH}/${productId}/${fileName}`;
    const file = bucket.file(filePath);

    try {
      await file.save(buffer, {
        metadata: {
          contentType: mimeType,
        },
      });

      await file.makePublic();

      return `https://storage.googleapis.com/${bucket.name}/${filePath}`;
    } catch (error) {
      console.error("Error uploading file:", error);
      throw new Error("Failed to upload file to Firebase Storage");
    }
  }

  static async deleteFile(fileUrl: string): Promise<void> {
    try {
      const fileName = fileUrl.split("/").pop();
      if (!fileName) throw new Error("Invalid file URL");

      const filePath = `${this.PRODUCT_IMAGES_PATH}/${fileName}`;
      const file = bucket.file(filePath);

      await file.delete();
    } catch (error) {
      console.error("Error deleting file:", error);
      throw new Error("Failed to delete file");
    }
  }
}
