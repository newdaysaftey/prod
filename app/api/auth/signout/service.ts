//
import { BaseService } from "@/app/api/services/base.service";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface SigninData {
  Email: string;
  Password: string;
}

export class SignoutService extends BaseService {
  async signout(data: SigninData) {
    try {
      const user = await prisma.user.findFirst({
        where: {
          Email: data.Email,
        },
        select: {
          UserId: true,
          Email: true,
          Role: true,
          PasswordHash: true,
        },
      });
      if (!user) {
        throw new Error("User not found, please signup");
      }
      return user;
    } catch (error) {
      throw new Error("Error during logout");
    }
  }
}
