//
import { BaseService } from "@/app/api/services/base.service";
import prisma from "@/lib/prisma";
import { Prisma, Size } from "@prisma/client";

export class CommentService extends BaseService {
  async createComment(
    userId: string,
    productId: string,
    comment: string,
    rating: number
  ) {
    const comments = await prisma.comments.create({
      data: {
        comment: comment,
        userId: userId,
        productId: productId,
        rating: rating,
      },
    });
    return comments;
  }

  async getComments(productId: string) {
    const comments = await prisma.comments.findMany({
      where: {
        isDeleted: false,
        productId: productId,
      },
    });
    return comments;
  }

  async updateComments(
    commentId: string,
    userId: string,
    productId: string,
    comment?: string,
    rating?: number
  ) {
    const comments = await prisma.comments.update({
      where: {
        isDeleted: false,
        id: commentId,
        userId: userId,
        productId: productId,
      },
      data: {
        comment,
        rating,
      },
    });
    return comments;
  }

  async deleteComment(userId: string, commentId: string) {
    try {
      const comments = await prisma.comments.update({
        where: {
          id: commentId,
          userId: userId,
        },
        data: {
          isDeleted: true,
        },
      });
      return comments;
    } catch (error) {
      throw new Error(
        "Comment not found or you don't have permission to delete it"
      );
    }
  }
}
