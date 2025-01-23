import { BaseController } from "@/app/api/controllers/base.controller";
import { ContactFormService } from "./service";
import { NextRequest } from "next/server";
import { ContactFormData } from "@/app/types/global";

export class ContactFormController extends BaseController {
  [x: string]: any;
  private service: ContactFormService;

  constructor() {
    super();
    this.service = new ContactFormService();
  }

  async sendContactFormEmail(request: NextRequest) {
    try {
      const data: ContactFormData = await request.json();

      // Validate required fields
      if (!data.firstName || !data.lastName || !data.email || !data.orderType) {
        return this.sendError("Required fields missing");
      }
      await this.service.sendContactFormEmail(data);
      return this.sendSuccess("Contact request created successfully");
    } catch (error) {
      return this.sendError(error as Error);
    }
  }
}
