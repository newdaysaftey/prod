import { BaseController } from "@/app/api/controllers/base.controller";
import { NextRequest } from "next/server";
import { FAQService, faqService } from "./service";

export class FAQController extends BaseController {
  private faqService: FAQService;

  constructor() {
    super();
    this.faqService = faqService; // Use the singleton instance
  }

  async handleGetFAQs() {
    try {
      const faqs = await this.faqService.getAllFAQs();
      return this.sendSuccess(faqs, "FAQs retrieved successfully");
    } catch (error) {
      console.error("Error in FAQ controller:", error);
      return this.sendError("Failed to retrieve FAQs");
    }
  }

  async handleQuestion(request: NextRequest) {
    try {
      const body = await request.json();
      const { question } = body;

      if (!question) {
        return this.sendError("Question is required");
      }

      const response = await this.faqService.findAnswer(question);
      return this.sendSuccess(response, "Response generated successfully");
    } catch (error) {
      console.error("Error processing question:", error);
      return this.sendError("Failed to process question");
    }
  }
}

export const faqController = new FAQController();
