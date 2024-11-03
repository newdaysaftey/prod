// services/signup.service.ts
import { BaseService } from "@/app/api/services/base.service";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface SigninData {
  Email: string;
  Password: string;
}

export class SigninService extends BaseService {
  private JWT_SECRET = process.env.JWT_SECRET as string;
  async findUser(data: SigninData) {
    const user = await prisma.user.findUnique({
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

    if (!user.PasswordHash) {
      throw new Error("Password not set for this account");
    }

    const isPasswordValid = bcrypt.compare(data.Password, user.PasswordHash);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    const token = jwt.sign(
      { userId: user.UserId, email: user.Email, role: user.Role },
      this.JWT_SECRET,
      { expiresIn: "1h" }
    );
    return { user, token };
  }
}
