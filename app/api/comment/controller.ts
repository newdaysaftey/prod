import { BaseController } from "@/app/api/controllers/base.controller";
import { CommentService } from "./service";
import { NextRequest } from "next/server";

interface commentBody {
  commentId: string;
  productId: string;
  comment: string;
  rating: number;
}

export class CommentController extends BaseController {
  [x: string]: any;
  private service: CommentService;

  constructor() {
    super();
    this.service = new CommentService();
  }

  async createComment(userId: string, body: commentBody) {
    try {
      const { productId, comment, rating } = body as commentBody;
      const comments = await this.service.createComment(
        userId,
        productId,
        comment,
        rating
      );

      return this.sendSuccess(
        comments,
        "comment added to product successfully"
      );
    } catch (error) {
      return this.sendError(error as Error);
    }
  }

  async getComments(request: NextRequest) {
    try {
      const searchParams = request.nextUrl.searchParams;
      const productId = searchParams.get("productId") || "";
      const comments = await this.service.getComments(productId);

      return this.sendSuccess(comments, "comment fetched successfully");
    } catch (error) {
      return this.sendError(error as Error);
    }
  }

  async updateComments(userId: string, body: commentBody) {
    try {
      const { commentId, productId, comment, rating } = body as commentBody;
      const comments = await this.service.updateComments(
        commentId,
        userId,
        productId,
        comment,
        rating
      );

      return this.sendSuccess(comments, "comment updated successfully");
    } catch (error) {
      return this.sendError(error as Error);
    }
  }
  async deleteComment(userId: string, request: NextRequest) {
    try {
      const searchParams = request.nextUrl.searchParams;
      const commentId = searchParams.get("commentId") || "";
      const comments = await this.service.deleteComment(userId, commentId);

      return this.sendSuccess(comments, "comment deleted successfully");
    } catch (error) {
      return this.sendError(error as Error);
    }
  }
}
