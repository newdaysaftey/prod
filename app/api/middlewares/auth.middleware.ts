import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { errorResponse } from "@/app/api/utils/response.util";

export async function validateCredentials(body: any) {
  const Email = body.Email;
  const Password = body.Password;
  if (!Email || !Password) {
    return errorResponse("Email and password are required");
  }
  const user = await prisma.user.findUnique({
    where: { Email: Email },
  });

  if (!user) {
    return errorResponse("User not found, please signup");
  }

  const isPasswordValid = await bcrypt.compare(Password, user.PasswordHash);
  if (!isPasswordValid) {
    return errorResponse("Invalid password");
  }

  return user;
}
